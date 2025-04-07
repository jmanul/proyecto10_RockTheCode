import "./home.css"
import { createLayout } from "../components/layout";
import { initHomeMenu } from "../utils/logic/init";
import { createTitle } from "../components/title";


export const renderHomePage = async () => {
     
     window.history.pushState({}, "", '/home');
    
     const user = await initHomeMenu();
     
    const main = createLayout();
     const title = createTitle();
     main.prepend(title);
    
     if (user) {

          const userPerfilImg = document.querySelector('img.perfil');
          const userPerfilName = document.querySelector('p.perfil');
          userPerfilImg.src = user.avatar;
          userPerfilName.innerText = user.userName;
          userPerfilName.style.color = '#ff00ff';

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

