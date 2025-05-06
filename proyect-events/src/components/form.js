import './form.css';

export const createForm = async (fields, formName) => {
     const form = document.createElement('form');
     form.classList.add('create-form', formName, 'flex-container');
     form.id = formName;

     fields.forEach((field) => {
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
          }

          div.appendChild(label);
          div.appendChild(input);
          form.appendChild(div);
     });

     const submitButton = document.createElement('button');
     submitButton.type = 'submit';
     submitButton.textContent = formName;
     submitButton.classList.add('button');
     form.appendChild(submitButton);

     return form;
};


