import './form.css';

export class FormBuilder {
     constructor(fields, formName) {
          this.fields = fields;
          this.formName = formName;
          this.form = document.createElement('form');
          this.form.classList.add('create-form', formName, 'flex-container');
          this.form.id = formName;
     }

  async  createForm(existingValues = {}) {
          this.fields.forEach((field) => {
               const div = document.createElement('div');
               div.classList.add('form-group', 'flex-container');

               const label = document.createElement('label');
               label.textContent = field.placeholder;

               let input;

               if (field.type === 'select') {
                    input = document.createElement('select');
                    input.name = field.name;
                    input.required = field.required || false;

                    const placeholderOption = document.createElement('option');
                    placeholderOption.value = '';
                    placeholderOption.textContent = `Seleccione ${field.placeholder.toLowerCase()}`;
                    placeholderOption.disabled = true;
                    placeholderOption.selected = true;
                    input.appendChild(placeholderOption);

                    field.options.forEach(optionValue => {
                         const option = document.createElement('option');
                         option.value = optionValue;
                         option.textContent = optionValue;
                         input.appendChild(option);
                    });

               } else if (field.type === 'textarea') {
                    input = document.createElement('textarea');
                    input.name = field.name;
                    input.placeholder = field.placeholder;
                    input.required = field.required || false;
                    input.rows = field.rows || 4;
                    input.classList.add('textarea');

               } else {
                    input = document.createElement('input');
                    input.type = field.type || 'text';
                    input.name = field.name;
                    input.placeholder = field.placeholder;
                    input.required = field.required || false;
                    if (field.type === 'number' && field.min !== undefined) input.min = field.min;
                    if (field.type === 'datetime-local') input.min = field.min || new Date().toISOString().slice(0, 16);
               }

               if (existingValues[field.name] && field.type !== 'file') {
                    input.value = existingValues[field.name];
               }

               input.addEventListener('input', () => this.validateField(input, field));

               div.appendChild(label);
               div.appendChild(input);
               this.form.appendChild(div);
          });

          const submitButton = document.createElement('button');
          submitButton.type = 'submit';
          submitButton.textContent = this.formName;
          submitButton.classList.add('button');
          this.form.appendChild(submitButton);

          return this.form;
     }

     validateField(input, field) {
          input.classList.remove('invalid');
          input.setCustomValidity("");

          const value = input.value.trim();

          if (field.required && !value) {
               input.classList.add('invalid');
               input.setCustomValidity('Este campo es obligatorio.');
               return false;
          }

          if (field.type === 'number') {
               const min = field.min ?? 1;
               if (Number(value) < min) {
                    input.classList.add('invalid');
                    input.setCustomValidity(`Debe ser mayor o igual a ${min}`);
                    return false;
               }
          }

          if (field.name === 'endDate') {
               const startDate = this.form.querySelector('[name="startDate"]')?.value;
               if (startDate && value && value < startDate) {
                    input.classList.add('invalid');
                    input.setCustomValidity('La fecha de fin no puede ser anterior a la de inicio.');
                    return false;
               }
          }

          if (field.name === 'startDate') {
               const now = new Date().toISOString().slice(0, 16);
               if (value < now) {
                    input.classList.add('invalid');
                    input.setCustomValidity('La fecha de inicio no puede ser anterior a hoy.');
                    return false;
               }
          }

          return true;
     }

     validateAllFields() {
          let isValid = true;

          this.fields.forEach(field => {
               const input = this.form.querySelector(`[name="${field.name}"]`);
               if (!input) return;
               const valid = this.validateField(input, field);
               if (!valid) isValid = false;
          });

          // Validación HTML5 adicional
          if (!this.form.checkValidity()) {
               this.form.reportValidity();
               isValid = false;
          }

          return isValid;
     }
}


