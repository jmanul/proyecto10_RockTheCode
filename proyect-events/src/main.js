import "../style.css";

import { renderHomePage } from './pages/home.js';
// import { renderRegisterLoginPage } from './pages/registerLogin.js';

const appContainer = document.getElementById('app');

document.addEventListener("DOMContentLoaded", async () => {

     renderHomePage(appContainer);
   
});


