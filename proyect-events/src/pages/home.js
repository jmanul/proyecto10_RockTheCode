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
     if (!user) {

          const navEventsMenu = document.getElementById('nav-events-type-menu');
          navEventsMenu.style.opacity = '0';
        
          const eventsMenu = document.getElementById('events-type-menu');
          eventsMenu.remove();

     }

     if (user) {

          const userPerfilImg = document.querySelector('img.perfil');
          const userPerfilName = document.querySelector('p.perfil');
          userPerfilImg.src = user.avatar;
          userPerfilName.innerText = user.userName;
          userPerfilName.style.color = '#00ffcc';

     }
     const eventsSection = document.querySelector('.grid-events');
     const textEvents = document.querySelector('.text-events');
     textEvents.innerHTML = `<h2>Aqui encontraras eventos disponibles</h2>`;
     const pasesSection = document.querySelector('.div-passes');
     const textPasses = document.querySelector('.text-passes');
     textPasses.innerHTML = `<h2>Descubrelos!! Crealos!!</h2>`;
     eventsSection.innerHTML = `<img src="/assets/peoples-fest.webp" alt="art-home-image">`;
     pasesSection.innerHTML = `<img src="/assets/passes-home.webp" alt="peoples-home-image">`;

   

}

