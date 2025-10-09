import { toLocalDatetimeInput } from '../utils/logic/dateFormat';
import './form.css';

export class FormBuilder {
     constructor(fields, formName, existingValues = {}) {
          const name = formName.toLowerCase();
          this.fields = fields;
          this.formName = formName;
          this.existingValues = existingValues;

          this.form = document.createElement('form');
          this.form.classList.add('create-form', name, 'flex-container');
          this.form.id = name;
     }

     async createForm(fileOn = true) {
          this.fields.forEach((field) => {
               const div = document.createElement('div');
               div.classList.add('form-group', 'flex-container');

               const label = document.createElement('label');
               label.textContent = field.placeholder;

               let input;

               if (field.type === 'select') {
                    input = document.createElement('select');
                    const placeholderOption = document.createElement('option');
                    placeholderOption.value = '';
                    placeholderOption.textContent = `Seleccione ${field.placeholder.toLowerCase()}`;
                    placeholderOption.disabled = true;
                    placeholderOption.selected = true;
                    input.appendChild(placeholderOption);

                    field.options.forEach(opt => {
                         const option = document.createElement('option');
                         option.value = opt;
                         option.textContent = opt;
                         input.appendChild(option);
                    });

               } else if (field.type === 'textarea') {
                    input = document.createElement('textarea');
                    input.rows = 4;

               } else if (field.type === 'file') {

                    // decidimos si incluir file en el formulario
                    if (fileOn) {

                         input = document.createElement('input');
                         input.type = 'file';
                         input.id = 'file-input';
                         input.classList.add('file-Input');
                         label.for = 'file-input';

                    } else {

                         return; // Saltar este campo
                    }
               } else {
                    input = document.createElement('input');
                    input.type = field.type;
               }

               input.name = field.name;
               input.placeholder = field.placeholder;
               if (field.required) input.required = true;
               if (field.min !== undefined) input.min = field.min;
               if (field.max !== undefined) input.max = field.max;

               // Asignar valor existente si no es archivo
               if (field.type !== 'file' && this.existingValues[field.name] !== undefined) {
                    if (field.type === 'datetime-local') {
                         //formateamos la fecha para que sea aceptada por el input
                         const formattedDate = toLocalDatetimeInput(this.existingValues[field.name]);
                         input.value = formattedDate;
                         input.dataset.originalValue = formattedDate;
                    } else if (field.type === 'select') { 
                         // comprobarantes si el valor del select tiene un nombre para cargar el pais
                         input.value = this.existingValues[field.name].name || this.existingValues[field.name];
                         input.dataset.originalValue = this.existingValues[field.name].name || this.existingValues[field.name];

                    } else {
                         input.value = this.existingValues[field.name];
                         input.dataset.originalValue = this.existingValues[field.name];
                    }
               }

               const errorSpan = document.createElement('span');
               errorSpan.classList.add('error-msg');

               input.addEventListener('input', () => this.validateField(input, field, errorSpan));

               div.appendChild(label);
               div.appendChild(input);
               div.appendChild(errorSpan);
               this.form.appendChild(div);


          });

          const buttonContainer = document.createElement('div');
          buttonContainer.classList.add('flex-container', `button-form-${this.formName.toLowerCase()}`, 'button-form');
          const submitBtn = document.createElement('button');
          submitBtn.type = 'submit';
          submitBtn.textContent = this.formName;
          submitBtn.classList.add('button');
          buttonContainer.appendChild(submitBtn);
          this.form.appendChild(buttonContainer);

          return this.form;
     }

     validateField(input, field, errorSpan) {
          input.classList.remove('error');
          errorSpan.textContent = '';

          let value;

          input.type === 'file' ? value = input : value = input.value;

          if (typeof field.validate === 'function') {
               const result = field.validate(value, this.form);
               if (result !== true) {
                    input.classList.add('error');
                    errorSpan.textContent = result;
                    return false;
               }
          }

          if (!input.checkValidity()) {
               input.classList.add('error');
               errorSpan.textContent = input.validationMessage;
               return false;
          }

          return true;
     }

     validateAllFields() {
          let isValid = true;

          this.fields.forEach(field => {
               const input = this.form.querySelector(`[name="${field.name}"]`);
               const errorSpan = input?.parentElement.querySelector('.error-msg');
               if (!input || !errorSpan) return;
               const valid = this.validateField(input, field, errorSpan);
               if (!valid) isValid = false;
          });

          return isValid;
     }

     getChangedFields() {
          return this.fields.filter(field => {
               const input = this.form.querySelector(`[name="${field.name}"]`);
               if (!input || input.disabled) return false;

               if (field.type === 'file') {
                    return input.files.length > 0;

               } else if (field.type === 'checkbox') {
                    const original = !!this.existingValues[field.name];
                    return input.checked !== original;

               } else if (field.type === 'datetime-local') {
                    const formattedOriginal = new Date(this.existingValues[field.name] || '').toISOString().slice(0, 16);
                    return input.value !== formattedOriginal;

               } else {
                    return input.value.trim() !== (this.existingValues[field.name] ?? '');
               }
          }).map(field => {
               const input = this.form.querySelector(`[name="${field.name}"]`);
               return {
                    ...field,
                    value: field.type === 'file' ? input?.files[0] : input?.value
               };
          });
     }

     async getChangedForm() {
          const changedFields = this.getChangedFields();

          if (changedFields.length === 0) return null;

          const builder = new FormBuilder(changedFields, 'Actualizar');
          const form = await builder.createForm();
          builder.assignFieldValues();
          return form;
     }

     assignFieldValues() {
          this.fields.forEach((field) => {
               const input = this.form.querySelector(`[name="${field.name}"]`);
               if (!input) return;

               if (field.type === 'file' && field.value instanceof File) {
                    const dt = new DataTransfer();
                    dt.items.add(field.value);
                    input.files = dt.files;

               } else if (field.type === 'checkbox') {
                    input.checked = field.value === true || field.value === 'true';

               } else if (field.type === 'datetime-local' && field.value) {
                   
                    input.value = field.value;

               } else if (field.value !== undefined) {
                    input.value = field.value;
               }

               if (input.value !== undefined) {
                    input.dataset.originalValue = input.value;
               }
          });
     }

     setForm(externalForm) {
          this.form = externalForm;
     }

     isImage(url) {
          return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
     }
}

