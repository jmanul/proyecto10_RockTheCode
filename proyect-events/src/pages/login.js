import './registerLogin.css';

import { renderLogin } from './registerLogin.js';


export const renderLoginPage = async () => {

     history.pushState({}, "", '/login');
     const main = document.getElementById('main');
     main.innerHTML = '';

     const login = await renderLogin();

     main.appendChild(login);

     console.log(login);

}

