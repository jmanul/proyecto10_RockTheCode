import { buildFetchJson } from '../api/buildFetch';
import { createEventsCard } from '../components/cardEvent';
import { createList } from '../components/list';
import './events.css';
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


export const eventsPage = async (e, route) => {
     try {
          // Crear el layout principal
          const appContainer = document.getElementById('app');
          if (!appContainer) {
               throw new Error("No se encontró el contenedor principal (#app).");
          }

          const main = createLayout(appContainer);

          // Crear el menú de tipos de eventos
          const eventsTypeMenu = createList('events-type-menu', typesEventsRoutes);
          if (!eventsTypeMenu) {
               throw new Error("No se pudo crear el menú de tipos de eventos.");
          }
          main.prepend(eventsTypeMenu);

          // Seleccionar las secciones de pases
          const pasesSection = document.querySelector('.div-passes');
          const textPasses = document.querySelector('.text-passes');

          if (!pasesSection || !textPasses) {
               throw new Error("No se encontraron las secciones de pases (.div-passes o .text-passes).");
          }

          // Mostrar contenido inicial en las secciones de pases
          textPasses.innerHTML = `<h2>Descubrelos!! Crealos!!</h2>`;
          pasesSection.innerHTML = `<img src="/assets/passes-home.webp" alt="peoples-home-image">`;

          // Renderizar los eventos
          await renderEvents(e, route);
     } catch (error) {
          console.error("Error en eventsPage:", error);
          const appContainer = document.getElementById('app');
          if (appContainer) {
               appContainer.innerHTML = "<p>Ocurrió un error al cargar la página de eventos.</p>";
          }
     }
};

export const renderEvents = async (e, route, options = {}) => {
     try {

          const { showPastEvents = false,
               onCardClick = null

          } = options;
          let nameEvent = e.target.textContent;
          let numberEvents = 0;

          // Seleccionar el contenedor de eventos
          const eventsSection = document.querySelector('.grid-events');
          eventsSection.style.scrollbarGutter = 'stable both-edges';
          const gridMain = document.querySelector('.grid-main');
          gridMain.style.gridTemplateColumns = 'auto auto';
          const infoSection = document.getElementById('info-section');
          infoSection?.remove();

          if (!eventsSection) {
               throw new Error("No se encontró el contenedor de eventos (.grid-events).");
          }

          eventsSection.innerHTML = '';

          // Obtener los datos de los eventos
          const request = await buildFetchJson({ route });
          const events = request?.events;
          const user = request?.user;

          // Validar si hay eventos disponibles
          if (!events || events.length === 0) {
               eventsSection.innerHTML = "<p>No hay resultados disponibles.</p>";
               return;
          }

          // Crear el contenedor de eventos
          const eventsContainer = document.createElement("div");
          eventsContainer.classList.add("events-container", "flex-container");

          const textEvents = document.querySelector('.text-events');
          if (!textEvents) {
               throw new Error("No se encontró el contenedor de texto (.text-events).");
          }

          // filtrar los eventos si hay filtros
          const validEvents = events.filter(event => {;

               if (showPastEvents || user.roll === 'administrator') return true; //Muestra todos si es true
               return new Date(event.endDate) > new Date();
          });

          // Iterar sobre los eventos
          for (const event of validEvents) {
               try {
                    // Convertir fechas
                    const eventEndDate = new Date(event.endDate);
                    const eventStartDate = new Date(event.startDate);

                    const eventCard = createEventsCard(event);
                    eventsContainer.appendChild(eventCard);
                    numberEvents++;

                    // Preparar datos adaptados para render
                    const extendedEvent = {
                         ...event,
                         startDateFormatted: dateFormat(eventStartDate).date,
                         startTimeFormatted: dateFormat(eventStartDate).time,
                         endDateFormatted: dateFormat(eventEndDate).date
                    };
                    const eventsRoute = { action: eventsPage, url: '/events' }
                    const eventRoute = { url: route + `/${event.name}` };
                    const passesRoute = { url: `/passes/event/${event._id}`, action: renderPasesPage };

                    // Añadir el evento de clic a la tarjeta
                    eventCard.addEventListener('click', (e) => {
                         if (onCardClick) {
                              onCardClick(e, extendedEvent, keyMapEvent, textEvents, eventsSection, event); 
                         } else {
                              navigate(e, eventRoute);

                              if (new Date(event.endDate) > new Date()) {
                                   renderItemDetails(extendedEvent, keyMapEvent, textEvents, eventsSection, event, passesRoute, 'Abonos');

                              } else {

                                   renderItemDetails(extendedEvent, keyMapEvent, textEvents, eventsSection, event, eventsRoute, 'volver');
                                   

                              }
                         };
                    });
               } catch (error) {
                    console.error(`Error al procesar el evento: ${event?.name}`, error);
               }
          }

          // Mostrar mensaje de resultados
          if (numberEvents === 0) {
               eventsContainer.innerHTML = "<p>No hay resultados disponibles.</p>";
          } else {
               textEvents.innerHTML = `<h2>Encontrados ${numberEvents} resultados en ${nameEvent}</h2>`;
          }

          // Añadir el contenedor de eventos al DOM
          eventsSection.appendChild(eventsContainer);
          return events;
     } catch (error) {
          console.error("Error en renderEvents:", error);
          eventsSection.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
     }
};











