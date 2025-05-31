import './form.css';

export class FormBuilder {
     constructor(fields, formName) {
          this.fields = fields;
          this.formName = formName;
          this.form = document.createElement('form');
          this.form.classList.add('create-form', formName, 'flex-container');
          this.form.id = formName;
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
               } else {
                    input = document.createElement('input');
                    input.type = field.type;
               }

               input.name = field.name;
               input.placeholder = field.placeholder;
               if (field.required) input.required = true;
               if (field.min !== undefined) input.min = field.min;
               if (field.max !== undefined) input.max = field.max;

               if (existingValues[field.name] && field.type !== 'file') {
                    input.value = existingValues[field.name];
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
          buttonContainer.classList.add('flex-container', `button-form-${this.formName}`, 'button-form');
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
}


