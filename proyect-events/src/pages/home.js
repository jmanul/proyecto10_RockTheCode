import "./home.css"

import { createFooter } from "../components/footer";
import { createHeader } from "../components/header";
import { createLayout } from "../components/layout";
import { createSidebar } from "../components/sidebar";
import { initHomeMenu } from "../utils/logic/init";


export const renderHomePage = async () => {
     
     window.history.pushState({}, "", '/home');
     const appContainer = document.getElementById('app');
     appContainer.classList.add('app', 'flex-container');
     document.body.append(appContainer); 
     appContainer.innerHTML = '';
     const user = await initHomeMenu();
     console.log(user);
     createLayout(appContainer);
   
     const eventsSection = document.querySelector('.grid-events');
     const textEvents = document.querySelector('.text-events');
     textEvents.innerHTML = `<h2>Aqui encontraras eventos disponibles</h2>`;
     const pasesSection = document.querySelector('.div-passes');
     const textPasses = document.querySelector('.text-passes');
     textPasses.innerHTML = `<h2>Descubrelos!!</h2>`;
     eventsSection.innerHTML = `<img src="/assets/peoples-fest.webp" alt="art-home-image">`;
     pasesSection.innerHTML = `<img src="/assets/passes-home.webp" alt="peoples-home-image">`;
     const footer = createFooter();
     document.body.appendChild(footer);


}

