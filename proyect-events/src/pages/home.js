import "./home.css"
import { buildFetchJson } from "../api/buildFetch";
import { createFooter } from "../components/footer";
import { createHeader } from "../components/header";
import { createLayout } from "../components/layout";
import { createSidebar } from "../components/sidebar";
import { createLogo } from "../components/logo";

export const renderHomePage = async () => {
     
     window.history.pushState({}, "", '/home');
     const appContainer = document.getElementById('app');
     appContainer.classList.add('app', 'flex-container');
     document.body.append(appContainer); 
     appContainer.innerHTML = '';
     const request = await buildFetchJson({ route: "/users/user" });
     
     console.log('esto es el user',request);
     createHeader();
     createSidebar();
     createLayout(appContainer);
   
     const eventsSection = document.querySelector('.grid-events');
     const textEvents = document.querySelector('.text-events');
     textEvents.innerHTML = `<h2>Aqui encontraras eventos disponibles</h2>`;
     const pasesSection = document.querySelector('.div-passes');
     const textPasses = document.querySelector('.text-passes');
     textPasses.innerHTML = `<h2>Descubrelos!!</h2>`;
     eventsSection.innerHTML = `<img src="/assets/art-home.png" alt="art-home-image">`;
     pasesSection.innerHTML = `<img src="/assets/passes-home.png" alt="peoples-home-image">`;
     const footer = createFooter();
     document.body.appendChild(footer);


}