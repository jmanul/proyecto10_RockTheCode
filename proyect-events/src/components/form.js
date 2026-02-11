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

               // Configurar atributos de dependencia
               if (field.dependsOn) {
                    div.dataset.dependsOn = field.dependsOn;
                    div.dataset.showWhen = field.showWhen;
                    div.style.display = 'none';
               }

               const label = document.createElement('label');
               label.textContent = field.placeholder;

               let input;

               // Crear input según el tipo
               if (field.type === 'select') {
                    input = document.createElement('select');
                    input.classList.add('custom-select');

                    const placeholderOption = document.createElement('option');
                    placeholderOption.value = '';
                    placeholderOption.textContent = `Seleccione ${field.placeholder.toLowerCase()}`;
                    placeholderOption.disabled = true;
                    placeholderOption.selected = true;
                    input.appendChild(placeholderOption);

                    field.options.forEach(opt => {
                         const option = document.createElement('option');
                         // Soportar opciones como objetos {value, label} o como strings
                         if (typeof opt === 'object' && opt.value !== undefined) {
                              option.value = opt.value;
                              option.textContent = opt.label;
                         } else {
                              option.value = opt;
                              option.textContent = opt;
                         }
                         input.appendChild(option);
                    });

                    // Añadir listener para campos dependientes
                    input.addEventListener('change', () => {
                         this.handleDependentFields(field.name, input.value);
                    });

               } else if (field.type === 'textarea') {
                    input = document.createElement('textarea');
                    input.rows = 4;

               } else if (field.type === 'file') {
                    if (fileOn) {
                         input = document.createElement('input');
                         input.type = 'file';
                         input.id = 'file-input';
                         input.classList.add('file-Input');
                         label.htmlFor = 'file-input';
                    } else {
                         return; // Saltar este campo
                    }

               } else if (field.type === 'checkbox') {
                    input = document.createElement('input');
                    input.type = 'checkbox';
                    input.name = field.name;
                    input.classList.add('ckeckbox', 'flex-container'); 

                    // Prellenar si hay valor existente
                    if (this.existingValues[field.name] !== undefined) {
                         input.checked = !!this.existingValues[field.name];
                         input.dataset.originalValue = input.checked;
                    }

               } else if (field.type === 'guestList') {
                    // Tipo especial para lista de invitados
                    input = this.createGuestListInput(field);

               } else {
                    input = document.createElement('input');
                    input.type = field.type;
               }

               // Propiedades comunes a todos los inputs
               input.name = field.name;
               if (field.type !== 'guestList') {
                    input.placeholder = field.placeholder;
               }
               if (field.required) input.required = true;
               if (field.min !== undefined) input.min = field.min;
               if (field.max !== undefined) input.max = field.max;

               // Asignar valor existente si NO es file ni checkbox ni guestList
               if (field.type !== 'file' && field.type !== 'checkbox' && field.type !== 'guestList' && this.existingValues[field.name] !== undefined) {
                    if (field.type === 'datetime-local') {
                         const formattedDate = toLocalDatetimeInput(this.existingValues[field.name]);
                         input.value = formattedDate;
                         input.dataset.originalValue = formattedDate;
                    } else if (field.type === 'select') {
                         input.value = this.existingValues[field.name].name || this.existingValues[field.name];
                         input.dataset.originalValue = input.value;
                    } else {
                         input.value = this.existingValues[field.name];
                         input.dataset.originalValue = this.existingValues[field.name];
                    }
               }

               const errorSpan = document.createElement('span');
               errorSpan.classList.add('error-msg');

               if (field.type !== 'guestList') {
                    input.addEventListener('input', () => this.validateField(input, field, errorSpan));
               }

               div.appendChild(label);
               div.appendChild(input);
               div.appendChild(errorSpan);
               this.form.appendChild(div);
          });

          // Botón de submit
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

     handleDependentFields(fieldName, value) {
          const dependentDivs = this.form.querySelectorAll(`[data-depends-on="${fieldName}"]`);
          dependentDivs.forEach(div => {
               const showWhen = div.dataset.showWhen;
               if (value === showWhen) {
                    div.style.display = 'flex';
               } else {
                    div.style.display = 'none';
               }
          });
     }

     createGuestListInput(field) {
          const container = document.createElement('div');
          container.classList.add('guest-list-container');
          container.dataset.name = field.name;

          // Lista de invitados
          const guestListUl = document.createElement('ul');
          guestListUl.classList.add('guest-list');

          // Contenedor para añadir nuevo invitado
          const addGuestContainer = document.createElement('div');
          addGuestContainer.classList.add('add-guest-container', 'flex-container');

          const usernameInput = document.createElement('input');
          usernameInput.type = 'text';
          usernameInput.placeholder = 'Nombre de usuario';
          usernameInput.classList.add('guest-username-input');

          const maxTicketsInput = document.createElement('input');
          maxTicketsInput.type = 'number';
          maxTicketsInput.placeholder = 'Máx. entradas';
          maxTicketsInput.min = 1;
          maxTicketsInput.value = 1;
          maxTicketsInput.classList.add('guest-max-tickets-input');

          const addBtn = document.createElement('button');
          addBtn.type = 'button';
          addBtn.textContent = '+';
          addBtn.classList.add('button', 'add-guest-btn');

          addBtn.addEventListener('click', () => {
               const userName = usernameInput.value.trim();
               const maxTickets = parseInt(maxTicketsInput.value) || 1;

               if (!userName) return;

               // Verificar si ya existe
               const existingItems = guestListUl.querySelectorAll('.guest-item');
               for (const item of existingItems) {
                    if (item.dataset.username === userName) {
                         alert('Este usuario ya está en la lista');
                         return;
                    }
               }

               // Crear item de invitado
               const guestItem = document.createElement('li');
               guestItem.classList.add('guest-item', 'flex-container');
               guestItem.dataset.username = userName;
               guestItem.dataset.maxTickets = maxTickets;

               guestItem.innerHTML = `
                    <span class="guest-name">${userName}</span>
                    <span class="guest-tickets">(${maxTickets} entradas)</span>
                    <button type="button" class="remove-guest-btn">×</button>
               `;

               const removeBtn = guestItem.querySelector('.remove-guest-btn');
               removeBtn.addEventListener('click', () => guestItem.remove());

               guestListUl.appendChild(guestItem);

               // Limpiar inputs
               usernameInput.value = '';
               maxTicketsInput.value = 1;
          });

          addGuestContainer.appendChild(usernameInput);
          addGuestContainer.appendChild(maxTicketsInput);
          addGuestContainer.appendChild(addBtn);

          container.appendChild(guestListUl);
          container.appendChild(addGuestContainer);

          // Hidden input para almacenar los datos
          const hiddenInput = document.createElement('input');
          hiddenInput.type = 'hidden';
          hiddenInput.name = field.name;
          container.appendChild(hiddenInput);

          return container;
     }

     getGuestListData() {
          const guestListContainer = this.form.querySelector('.guest-list-container');
          if (!guestListContainer) return [];

          const guests = [];
          const items = guestListContainer.querySelectorAll('.guest-item');
          items.forEach(item => {
               guests.push({
                    userName: item.dataset.username,
                    maxTickets: parseInt(item.dataset.maxTickets) || 1
               });
          });
          return guests;
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
               
               // envia 'true' es marcado y si se desmarca se envia 'false'.
               if (field.type === 'checkbox') {
                    
                    return {
                         ...field,
                         value: input.checked
                    };
               } 
               let valueToSend;
               if (field.type === 'file') {
                    valueToSend = input?.files[0];
               } else {
                    valueToSend = input?.value;
               }

               return {
                    ...field,
                    value: valueToSend
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
                   
                    input.checked = !!field.value;

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

