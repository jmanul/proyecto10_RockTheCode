import { buildFetchJson } from '../api/buildFetch';
import { createEventCard } from '../components/cardEvent';

import './events.css';
import { renderRegisterLoginPage } from './registerLogin';


export const renderEventsPage = async (route) => {
     

     try {

          const eventsSection = document.querySelector('.grid-events');

          eventsSection.innerHTML = '';

          const request = await buildFetchJson({ route });

          const events = request.events;

          const eventsContainer = document.createElement("div");
          eventsContainer.classList.add("events-container", "flex-container");
          const textEvents = document.querySelector('.text-events');
          let notInitEvent = 0;
          for (const event of events) {

               const eventEndDate = new Date(event.endDate);
               const nowDate = new Date();

               if (eventEndDate.getTime() > nowDate.getTime()) {

                    const eventCard = createEventCard(event);
                    eventsContainer.appendChild(eventCard);
                    notInitEvent++;
               
               //      event.addEventListener('click', (e) => {
               //              eventsContainer.innerHTML =`${event.id}`      
               //      });
                    console.log(event);
               }        
              
          };

          if (!events || events.length === 0) {
               eventsContainer.innerHTML = "<p>No hay eventos disponibles.</p>";
          } else {

               textEvents.innerHTML = `<h2>Encontrados ${notInitEvent} eventos de ${events[1].type}</h2>`;
          }

          eventsSection.appendChild(eventsContainer);

     } catch (error) {
         
          renderRegisterLoginPage();
     }

};







