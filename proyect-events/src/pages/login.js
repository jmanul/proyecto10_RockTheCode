import './registerLogin.css';
import { CreateForm } from '../components/form.js';
import { renderEventsPage } from './events.js';
import { actionRequest } from '../utils/logic/actionRequest.js';


export const renderLoginPage = async (container) => {

     history.pushState({}, "", '/login');

     const registerLoginContainer = document.createElement('div');
     registerLoginContainer.classList.add('flex-container', 'register-login-container');
     const registerLoginGroup = document.createElement('div');
     registerLoginGroup.classList.add('flex-container', 'register-login-group');


     container.innerHTML = '';

     const loginFields = [
          { type: 'text', name: 'userName', placeholder: 'Usuario', required: true },
          { type: 'password', name: 'password', placeholder: 'Contraseña', required: true },
     ];


     const renderLogin = async () => {


          const formLogin = await CreateForm(loginFields, 'login');
          registerLoginGroup.appendChild(formLogin)
          return await actionRequest(formLogin, '/register/login/', 'POST', renderEventsPage, container);

     }

     const textLogin = document.createElement('h2');
     textLogin.innerText = 'Inicia sesión'
     registerLoginGroup.appendChild(textLogin);

     await renderLogin();


     container.appendChild(registerLoginContainer);
     registerLoginContainer.appendChild(registerLoginGroup)



}
