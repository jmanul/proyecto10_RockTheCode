import { buildFetchJson } from '../api/buildFetch';
import { createEventCard } from '../components/cardEvent';
import { createList } from '../components/list';
import './events.css';
import { renderRegisterLoginPage } from './registerLogin';
import { typesEventsRoutes } from "../utils/routes/routes";
import { createLayout } from '../components/layout';
import { dateFormat } from '../utils/logic/dateFormat';
import { renderItemDetails } from '../components/itemDetails';
import { navigate } from '../utils/logic/navigate';
import { renderPasesPage } from './passes';

const keyMapEvent = {
     description: { icon: "bi-info-circle" },
     location: { icon: "bi-geo-alt" },
     adress: { icon: "bi-buildings" },
     city: { icon: "bi-pin-map" },
     startDateFormatted: { icon: "bi-calendar-event" },
     startTimeFormatted: { icon: "bi-clock" },
     endDateFormatted: { icon: "bi-calendar-x" },
     maxCapacity: { icon: "bi-people" },
     eventStatus: { icon: "bi-check-all" }
};


export const renderEventsPage = async (e, route) => {
     const appContainer = document.getElementById('app');
     const main = createLayout(appContainer);
     const eventsTypeMenu = createList('events-type-menu', typesEventsRoutes);
     main.prepend(eventsTypeMenu);
     const pasesSection = document.querySelector('.div-passes');
     const textPasses = document.querySelector('.text-passes');
     textPasses.innerHTML = `<h2>Descubrelos!! Crealos!!</h2>`;
     pasesSection.innerHTML = `<img src="/assets/passes-home.webp" alt="peoples-home-image">`;

     renderEvents(e, route);

};

export const renderEvents = async (e, route) => {

     let nameEvent = e.target.textContent;
     let numberEvents = 0;

     const { url } = route;

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
               const eventStartDate = new Date(event.startDate);

               const nowDate = new Date();

               if (eventEndDate.getTime() > nowDate.getTime()) {

                    const eventCard = createEventCard(event);
                    eventsContainer.appendChild(eventCard);
                    numberEvents++;
                    // Prepara datos adaptados para render
                    const extendedEvent = {
                         ...event,
                         startDateFormatted: dateFormat(eventStartDate).date,
                         startTimeFormatted: dateFormat(eventStartDate).time,
                         endDateFormatted: dateFormat(eventEndDate).date
                    };

                    const eventRoute = { url: route + event.name }
                    
                    const passesRoute = { url : `/passes/event/${event._id}`, action : renderPasesPage }

                    eventCard.addEventListener('click', (e) => {
                       
                         navigate(e, eventRoute);
                         renderItemDetails(extendedEvent, keyMapEvent, textEvents, eventsSection, event, passesRoute, 'Abonos')

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

}










