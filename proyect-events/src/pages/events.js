import { buildFetchJson } from '../api/buildFetch';
import { createEventCard } from '../components/cardEvent';
import './events.css';
import { renderRegisterLoginPage } from './registerLogin';


export const renderEventsPage = async (e, route) => {
     
     let nameEvent = e.target.textContent;
     let numberEvents = 0;
 
     try {

          const eventsSection = document.querySelector('.grid-events');

          eventsSection.innerHTML = '';

          const request = await buildFetchJson({ route });
          const events = request.events;

          const eventsContainer = document.createElement("div");
          eventsContainer.classList.add("events-container", "flex-container");
          const textEvents = document.querySelector('.text-events');

          for (const event of events) {

               const eventEndDate = new Date(event.endDate);
             
               const nowDate = new Date();

               if (eventEndDate.getTime() > nowDate.getTime()) {

                    const eventCard = createEventCard(event);
                    eventsContainer.appendChild(eventCard);
                    numberEvents++;
                    eventCard.addEventListener('click', (e) => {
                         textEvents.innerHTML = `<div class="flex-container select-title"><div class="miniature-img"><img src="${event.image}" alt="evento image"></div><h3>${event.name}</h3></div>`;
                         eventsSection.innerHTML = `<div class="select-card"><p>${event.description}</p>
<strong>Lugar:</strong><p>${event.location}</p><strong>Dirección:</strong><p>${event.adress}</p><strong>Ciudad:</strong><p>${event.city}</p><strong>Fecha de inicio:</strong><p>${dateFormat(event.startDate)}</p><strong>Fecha de fin:</strong><p>${dateFormat(eventEndDate)}</p><strong>Aforo:</strong><p>${event.maxCapacity}</p><strong>Estado:</strong><p>${event.eventStatus}</p><strong>Entradas:</strong><p>${event.pasesOferedIds}</p></div>`;
                                      
                    });
                    
               }        
              
          };

          if (!events || events.length === 0) {
               eventsContainer.innerHTML = "<p>No hay resultados disponibles.</p>";
          } else {

               textEvents.innerHTML = `<h2>Encontrados ${numberEvents} resultados en ${nameEvent}</h2>`;
          }

          eventsSection.appendChild(eventsContainer);

     } catch (error) {
         
          renderRegisterLoginPage();
     }

};


export const dateFormat = async (date) => { 

   const standarDate = await date.toLocaleString('es-ES', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          hour12: false
    }).replace(',', '');
     
     return standarDate;
}; 




