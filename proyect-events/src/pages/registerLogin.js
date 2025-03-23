import './registerLogin.css';
import { CreateForm } from '../components/form.js';
import { renderLoginPage } from './login.js';
import { actionRequest } from '../utils/logic/actionRequest.js';
import { renderHomePage } from './home.js';




const registerLoginContainer = document.createElement('div');
registerLoginContainer.classList.add('flex-container', 'register-login-container');
const registerLoginGroup = document.createElement('div');
registerLoginGroup.classList.add('flex-container', 'register-login-group');

const loginFields = [
     { type: 'text', name: 'userName', placeholder: 'Usuario', required: true },
     { type: 'password', name: 'password', placeholder: 'Contraseña', required: true },
];

const registerFields = [...loginFields, { type: 'email', name: 'email', placeholder: 'email', required: false }];


export const renderRegisterLoginPage = async () => {
     
     const main = document.getElementById('main');
     main.innerHTML = '';

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
        
          return await actionRequest(formRegister, '/register/', 'POST', renderLoginPage, main);

     };

     await renderRegister();

    

     main.appendChild(registerLoginContainer);
     registerLoginContainer.appendChild(registerLoginGroup)

}

export const renderLogin = async () => {

     window.history.pushState({}, "", '/register/login');

     const formLogin = await CreateForm(loginFields, 'login');
     registerLoginGroup.appendChild(formLogin)
     await actionRequest(formLogin, '/register/login/', 'POST', renderHomePage, main);
     return formLogin;

}
