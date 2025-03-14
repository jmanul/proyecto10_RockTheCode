import "../style.css";
import { createFooter } from "./components/footer.js";
import { createHeader } from "./components/header.js";
import { createLayout } from "./components/layout.js";
import { createSidebar } from "./components/sidebar.js";

import { renderHomePage } from './pages/home.js';
// import { renderRegisterLoginPage } from './pages/registerLogin.js';

const appContainer = document.getElementById('app');
appContainer.classList.add('app','flex-container');
createHeader();
createSidebar();
document.body.appendChild(appContainer);
createLayout(appContainer);
const eventsSection = document.getElementById('events-section');


document.addEventListener("DOMContentLoaded", async () => {

      renderHomePage(eventsSection); 
     
     
   
});

const footer = createFooter();
document.body.appendChild(footer);


