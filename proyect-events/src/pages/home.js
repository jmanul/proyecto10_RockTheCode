import "./home.css"
import { createLayout } from "../components/layout";
import { initHomeMenu } from "../utils/logic/init";
import { createTitle } from "../components/title";
import { createList } from "../components/list";
import { typesEventsRoutes } from "../utils/routes/routes";


export const renderHomePage = async () => {
     try {
          // Actualizar la URL del navegador
          window.history.pushState({}, "", '/home');

          // Inicializar el menú de usuario
          const user = await initHomeMenu();

          // Crear el layout principal
          const main = createLayout();
          if (!main) {
               throw new Error("No se pudo crear el layout principal.");
          }

          // Crear el título de la página
          const title = createTitle();
          if (!title) {
               throw new Error("No se pudo crear el título de la página.");
          }
          main.prepend(title);

          // Actualizar información del perfil del usuario si está autenticado
          if (user) {
               const userPerfilImg = document.querySelector('img.perfil');
               const userPerfilName = document.querySelector('p.perfil');

               userPerfilImg.src = user.avatar;
               userPerfilName.innerText = user.userName;
               userPerfilName.style.color = '#ff00ff';

               if (user.roll === 'user') {
                   // Crear el menú de tipos de eventos
                            const eventsTypeMenu = createList('events-type-menu', typesEventsRoutes);
                            if (!eventsTypeMenu) {
                                 throw new Error("No se pudo crear el menú de tipos de eventos.");
                            }
                    eventsTypeMenu.classList.add('user-type-events');
                            title.after(eventsTypeMenu);
               } 
               
          }

          // Seleccionar las secciones de eventos y pases
          const eventsSection = document.querySelector('.grid-events');
          const textEvents = document.querySelector('.text-events');
          const pasesSection = document.querySelector('.div-passes');
          const textPasses = document.querySelector('.text-passes');

          // Validar que las secciones existan
          if (!eventsSection || !textEvents || !pasesSection || !textPasses) {
               throw new Error("No se encontraron todas las secciones necesarias en el DOM.");
          }

          // Actualizar contenido de las secciones
          textEvents.innerHTML = `<h2>Aquí encontrarás eventos disponibles</h2>`;
          textPasses.innerHTML = `<h2>Descúbrelos o Créalos!!</h2>`;
          eventsSection.innerHTML = `<img src="/assets/peoples-fest.webp" alt="art-home-image">`;
          pasesSection.innerHTML = `<img src="/assets/passes-home.webp" alt="peoples-home-image">`;

     } catch (error) {

          console.error("Error en renderHomePage:", error);

          const appContainer = document.getElementById('app');
          if (appContainer) {
               appContainer.innerHTML = "<p>Ocurrió un error al cargar la página de inicio.</p>";
          }
     }
};

