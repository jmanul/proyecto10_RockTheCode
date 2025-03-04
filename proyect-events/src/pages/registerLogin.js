import './registerLogin.css';
import { CreateForm } from '../components/form.js';
import { renderHomePage } from './home.js';
import { actionRequest } from '../utils/actionRequest';


export const renderRegisterLoginPage = async (container) => {

     const registerLoginContainer = document.createElement('div');
     registerLoginContainer.classList.add('flex-container', 'register-login-container');

     container.innerHTML = '';

     const loginFields = [
          { type: 'text', name: 'userName', placeholder: 'Usuario', required: true },
          { type: 'password', name: 'password', placeholder: 'Contraseña', required: true },
     ];

     const registerFields = [...loginFields];

     const renderLogin = async () => {
        
          const formLogin = await CreateForm(loginFields, 'login');
          registerLoginContainer.appendChild(formLogin)
          return await actionRequest(formLogin, '/register/login/', 'POST', renderHomePage, container);
          
     }
     
     await renderLogin();

     const formRegister = await CreateForm(registerFields, 'register');
     await actionRequest(formRegister, '/register/', 'POST', renderLogin, container);


     container.appendChild(registerLoginContainer);
     registerLoginContainer.appendChild(formRegister)

     
}
