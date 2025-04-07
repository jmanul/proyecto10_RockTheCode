import { buildFetchJson } from '../api/buildFetch';
import { createEventCard } from '../components/cardEvent';
import { createList } from '../components/list';
import './events.css';
import { renderRegisterLoginPage } from './registerLogin';
import { typesEventsRoutes } from "../utils/routes/routes";
import { createLayout } from '../components/layout';

const keyMapEvent = {
     description: { icon: "bi-info-circle" },
     location: { icon: "bi-geo-alt" },
     adress: { icon: "bi-buildings" },
     city: { icon: "bi-pin-map" },
     startDateFormatted: { icon: "bi-calendar-event" },
     startTimeFormatted: { icon: "bi-clock" },
     endDateFormatted: { icon: "bi-calendar-x" },
     maxCapacity: { icon: "bi-people" },
     eventStatus: { icon: "bi-check-all" },
     pasesOferedIds: { icon: "bi-ticket-perforated" },
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

                    eventCard.addEventListener('click', () => {
                         textEvents.innerHTML = `
        <div class="flex-container select-title">
          <div class="miniature-img">
            <img src="${event.image}" alt="evento image">
          </div>
          <h3>${event.name}</h3>
        </div>
      `;

                         eventsSection.innerHTML = renderItemDetails(extendedEvent, keyMapEvent);

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


export const dateFormat = (date) => {

     // Formatear la fecha
     const formattedDate = date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
     });

     // Formatear la hora
     const formattedTime = date.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
     });

     return {
          date: formattedDate,
          time: formattedTime
     };
};

function renderItemDetails(data, keyMapEvent) {
     let html = `<div class="select-card">`;

     for (const key in keyMapEvent) {
          const { icon } = keyMapEvent[key];
          const value = data[key];

          if (value !== undefined) {
               html += `
        <div class="icon-row">
          <i class="bi ${icon}"></i>
          <span>${value}</span>
        </div>`;
          }
     }

     html += `</div>`;
     return html;
}



//todo:  añadir botnones para elegir entradas

