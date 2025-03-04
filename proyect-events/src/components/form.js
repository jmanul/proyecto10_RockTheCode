import './form.css';
export const CreateForm = async (fields, formName) => {

     const form = document.createElement('form');
     form.classList.add('create-form', formName, 'flex-container');
     form.id = formName;

     await fields.forEach((field) => {
          const div = document.createElement('div');
          div.classList.add('form-group', 'flex-container');

          const label = document.createElement('label');
          label.textContent = field.placeholder;

          const input = document.createElement('input');
          input.type = field.type || 'text';
          input.name = field.name;
          input.placeholder = field.placeholder;
          input.required = field.required || false;

          div.appendChild(label);
          div.appendChild(input);
          form.appendChild(div);
     });

     const submitButton = document.createElement('button');
     submitButton.type = 'submit';
     submitButton.textContent = 'Enviar';
     submitButton.classList.add('button');
     form.appendChild(submitButton);

     return form;
     
}
