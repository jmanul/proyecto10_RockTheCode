import { buildFetchJson } from '../api/buildFetch';
import { createEventCard } from '../components/cardEvent';
import { createLayout } from '../components/layout';
import './home.css';
import { renderRegisterLoginPage } from './registerLogin';


export async function renderHomePage(container) {

     
     try {
           
         
          const events = await buildFetchJson({ route :"/events", container });

          // // Limpiar el contenedor antes de renderizar
          // container.innerHTML = `<h2>Eventos Disponibles</h2>`;

          const eventsContainer = document.createElement("div");
          eventsContainer.classList.add("events-container", "flex-container");

          if (!events || events.length === 0) {
               eventsContainer.innerHTML = "<p>No hay eventos disponibles.</p>";
          } else {
               events.forEach(event => {
                    const eventCard = createEventCard(event);
                    eventsContainer.appendChild(eventCard);
               });
          }

          container.appendChild(eventsContainer);

          

     } catch (error) {
         
         
          renderRegisterLoginPage(container);
     }
}



