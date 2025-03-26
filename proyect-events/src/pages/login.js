import './registerLogin.css';

import { renderLogin } from './registerLogin.js';


export const renderLoginPage = async () => {

     history.pushState({}, "", '/login');
     const app = document.getElementById('app');
     app.innerHTML = '';

     const login = await renderLogin();

     app.appendChild(login);


}

