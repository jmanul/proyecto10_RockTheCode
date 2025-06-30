import './form.css';

export class FormBuilder {
     constructor(fields, formName) {
          const name = formName.toLowerCase();
          this.fields = fields;
          this.formName = formName;
          this.form = document.createElement('form');
          this.form.classList.add('create-form', name, 'flex-container');
          this.form.id = name;
     }

     async createForm(existingValues = {}) {
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
                    input = document.createElement('input');
                    input.type = 'file';
                    input.classList.add('file-Input');

                    if (existingValues[field.name] && this.isImage(existingValues[field.name])) {
                         const imagePreview = document.createElement('img');
                         imagePreview.src = existingValues[field.name];
                         imagePreview.alt = 'Archivo actual';
                         imagePreview.classList.add('preview-img');
                         div.appendChild(imagePreview);
                         div.classList.add('group-file');
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
               if (field.type !== 'file' && existingValues[field.name] !== undefined) {
                    if (field.type === 'datetime-local') {
                         const rawDate = new Date(existingValues[field.name]);
                         if (!isNaN(rawDate.getTime())) {
                              const formattedDate = rawDate.toISOString().slice(0, 16);

                              input.value = formattedDate;
                              input.dataset.originalValue = formattedDate;
                         }
                    } else {
                         input.value = existingValues[field.name];
                         input.dataset.originalValue = existingValues[field.name];
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
          buttonContainer.classList.add('flex-container', `button-form-${this.name}`, 'button-form');
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

          const value = input.value;

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
          const changedFields = {};
          const inputs = this.form.querySelectorAll('input, select, textarea');

          inputs.forEach(input => {
               // Ignorar campos deshabilitados o sin nombre
               if (!input.name || input.disabled) return;

               const originalValue = input.dataset.originalValue;
               let currentValue;

               if (input.type === 'file') {
                    if (input.files.length > 0) {
                         changedFields[input.name] = input.files[0]; // archivo nuevo
                    }
                    return; // los archivos no tienen valor original
               }

               if (input.type === 'checkbox' || input.type === 'radio') {
                    currentValue = input.checked.toString();
               } else {
                    currentValue = input.value;
               }

               // Si no hay valor original, o ha cambiado
               if (originalValue === undefined || currentValue !== originalValue) {
                    changedFields[input.name] = currentValue;
               }
          });

          return changedFields;
     }


     isImage(url) {
          return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
     }
}


