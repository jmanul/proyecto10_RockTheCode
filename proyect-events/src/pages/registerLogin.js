import './registerLogin.css';
import { CreateForm } from '../components/form.js';
import { renderHomePage } from './home.js';
import { actionRequest } from '../utils/actionRequest';
import { renderLoginPage } from './login.js';


export const renderRegisterLoginPage = async (container) => {
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

     const registerFields = [ ...loginFields, { type: 'email', name: 'email', placeholder: 'email', required: false }];


   const renderLogin = async () => {

          
          const formLogin = await CreateForm(loginFields, 'login');
          registerLoginGroup.appendChild(formLogin)
          return await actionRequest(formLogin, '/register/login/', 'POST', renderHomePage, container);

     }

     const textLogin = document.createElement('h2');
     textLogin.innerText = 'Inicia sesión'
     registerLoginGroup.appendChild(textLogin);

     await renderLogin();

     const textRegister = document.createElement('h2');
     textRegister.innerText = '¿Aún no tienes una cuenta? Regístrate'
     registerLoginGroup.appendChild(textRegister);

     const renderRegister = async () => {

          const formRegister = await CreateForm(registerFields, 'register');
         
          registerLoginGroup.appendChild(formRegister)
        
          return await actionRequest(formRegister, '/register/', 'POST', renderLoginPage, container, registerLoginGroup);


     };

     await renderRegister();

    

     container.appendChild(registerLoginContainer);
     registerLoginContainer.appendChild(registerLoginGroup)



}
