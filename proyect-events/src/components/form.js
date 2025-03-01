import './form.css';
export const CreateForm = (fields, onSubmit) => {
     const form = document.createElement('form');
     form.classList.add('create-form');

     fields.forEach((field) => {
          const div = document.createElement('div');
          div.classList.add('form-group');

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

     form.addEventListener('submit', (e) => {
          e.preventDefault();
          console.log(e.target);
          onSubmit(e.target);
     });

     return form;
}
