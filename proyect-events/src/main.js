import "../style.css";
import { createHeader } from "./components/list.js";

import { renderHomePage } from './pages/home.js';
// import { renderRegisterLoginPage } from './pages/registerLogin.js';

const appContainer = document.getElementById('app');
appContainer.classList.add('flex-container');
createHeader();
document.body.appendChild(appContainer);



document.addEventListener("DOMContentLoaded", async () => {

      renderHomePage(appContainer);
     
     
   
});

const footer = document.createElement('footer');
footer.id = 'footer';
footer.className = 'footer';
document.body.append(footer);
const footerMaking = document.createElement('div');
footerMaking.classList.add( 'flex-container','making');
footer.append(footerMaking);
footerMaking.innerHTML = `<span class="flex-container"><strong>Hecho con 🤍 por Jmanul</strong><div class="pasttri-logo"><img src="/public/assets/logoPastri.svg" alt="logo pasttri"></div></span>`;


