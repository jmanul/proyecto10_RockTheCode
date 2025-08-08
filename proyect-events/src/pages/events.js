import { buildFetchJson } from '../api/buildFetch';
import { createEventsCard } from '../components/cardEvent';
import { createList } from '../components/list';
import './events.css';
import { typesEventsRoutes, userEventsRoutes, userRoutes } from "../utils/routes/routes";
import { createLayout } from '../components/layout';
import { dateFormat } from '../utils/logic/dateFormat';
import { actionButton, renderItemDetails } from '../components/itemDetails';
import { navigate } from '../utils/logic/navigate';
import { renderPassesPage } from './passes';
import { renderHomePage } from './home';

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
          const {
               showPastEvents = false,
               onCardClick = null
          } = options;

          let numberEvents = 0;

          // Obtener contenedores del DOM
          const gridEvents = document.querySelector('.grid-events');
          const gridMain = document.querySelector('.grid-main');
          const infoSection = document.getElementById('info-section');
          const infoGridSection = document.getElementById('info-grid-section');

          if (!gridEvents) throw new Error("No se encontró el contenedor de eventos (.grid-events).");

          gridEvents.innerHTML = '';
          gridEvents.style.scrollbarGutter = 'stable both-edges';
          gridMain.style.gridTemplateColumns = 'auto auto';
          gridMain.style.gap = '0';
          infoSection?.remove();
          infoGridSection?.remove();

          // Obtener eventos desde la API
          const request = await buildFetchJson({ route });
          const events = request?.events;
          const user = request?.user;

          // Si no hay eventos
          if (!events || events.length === 0) {
               gridEvents.innerHTML = `
               <div class="flex-container not-content image-not-content">
                    <h4>No hay eventos disponibles</h4>
                    <img src="https://res.cloudinary.com/dn6utw1rl/image/upload/v1753817663/default/sad-icon-logo_bbyzbd.png" alt="imagen triste">
               </div>`;

               const actionContainer = document.createElement('div');
               actionContainer.classList.add('flex-container', 'action-container');
               actionContainer.style.position = 'fixed';
               gridEvents.appendChild(actionContainer);

               if (route.includes('userEventsCreate')) {
                    const mesageNotEvent = gridEvents.querySelector('.not-content h4');
                    mesageNotEvent.innerText = 'Aún no has creado ningun evento';
                    await actionButton('Crear', userEventsRoutes[0], actionContainer);
               }

               await actionButton('Volver', {
                    url: '/home',
                    action: renderHomePage,
                    title: "PropoySal - Eventos y experiencias únicas",
                    description: "Descubre y crea los mejores eventos culturales, sociales y de entretenimiento."
               }, actionContainer);

               return;
          }

          const textEvents = document.querySelector('.text-events');
          if (!textEvents) throw new Error("No se encontró el contenedor de texto (.text-events).");

          // Crear contenedor de tarjetas
          const eventsContainer = document.createElement("div");
          eventsContainer.classList.add("events-container", "flex-container");

          // Filtrar eventos si es necesario
          const validEvents = events.filter(event =>
               (showPastEvents || user?.roll === 'administrator')
                    ? true
                    : new Date(event.endDate) > new Date()
          );

          // Iterar y renderizar tarjetas
          for (const event of validEvents) {
               try {
                    const eventCard = createEventsCard(event);
                    eventsContainer.appendChild(eventCard);
                    numberEvents++;

                    assignEventCardClick(eventCard, {
                         route, textEvents, gridEvents, onCardClick
                    }, event);
               } catch (error) {
                    console.error(`Error al procesar el evento: ${event?.name}`, error);
               }
          }

          // Mostrar mensaje si no hay eventos válidos
          if (numberEvents === 0) {
               eventsContainer.innerHTML = `
               <div class="flex-container not-content image-not-content">
                    <h4>Aún no se han creado eventos</h4>
                    <img src="https://res.cloudinary.com/dn6utw1rl/image/upload/v1753817663/default/sad-icon-logo_bbyzbd.png" alt="imagen triste">
               </div>`;
          } else {
               textEvents.innerHTML = `<h2>Eventos encontrados</h2>`;
          }

          // Agregar contenedor al DOM
          gridEvents.appendChild(eventsContainer);
          return events;

     } catch (error) {
          console.error("Error en renderEvents:", error);
          const gridEvents = document.querySelector('.grid-events');
          if (gridEvents) {
               gridEvents.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
          }
     }
};



export const assignEventCardClick = (eventCard, config, event) => {
     const {
          route, textEvents, gridEvents, onCardClick
     } = config;

     // Fechas formateadas
     const eventEndDate = new Date(event.endDate);
     const eventStartDate = new Date(event.startDate);

     const extendedEvent = {
          ...event,
          startDateFormatted: dateFormat(eventStartDate).date,
          startTimeFormatted: dateFormat(eventStartDate).time,
          endDateFormatted: dateFormat(eventEndDate).date
     };

     // Ruta base de eventos
     const eventsRoute = {
          action: eventsPage,
          url: '/events',
          title: "Eventos - PropoySal",
          description: "Listado de eventos."
     };

     const eventRoute = `/events/${event._id}`;

     // Ruta a los abonos (si aún está activo)
     const passesRoute = {
          url: `/passes/event/${event._id}`,
          action: renderPassesPage,
          title: `abonos de ${event.name}`,
          event,
          description: `aqui encontraras los abonos de ${event.name}`
     };

     // Listener para click en la tarjeta
     eventCard.addEventListener('click', (e) => {
          if (onCardClick) {
               const onCardClickRoute = {
                    originRoute: route,
                    url: eventRoute,
                    action: onCardClick,
                    data: extendedEvent,
                    keyMapEvent,
                    titleContainer: textEvents,
                    dataContainer: gridEvents,
                    item: event,
                    title: event.name,
                    description: event.description
               };
               navigate(e, onCardClickRoute);
          } else {
               // Evento aún activo
               if (new Date(event.endDate) > new Date()) {
                    const abonosRoute = {
                         originRoute: route,
                         url: eventRoute,
                         action: renderItemDetails,
                         data: extendedEvent,
                         keyMapEvent,
                         titleContainer: textEvents,
                         dataContainer: gridEvents,
                         item: event,
                         routeAction: passesRoute,
                         text: 'Abonos',
                         title: event.name,
                         description: event.description
                    };
                    navigate(e, abonosRoute);
               } else {
                    // Evento finalizado
                    const finishEventRoute = {
                         originRoute: route,
                         url: eventRoute,
                         action: renderItemDetails,
                         data: extendedEvent,
                         keyMapEvent,
                         titleContainer: textEvents,
                         dataContainer: gridEvents,
                         item: event,
                         routeAction: eventsRoute,
                         text: 'Volver',
                         title: event.name,
                         description: event.description
                    };
                    navigate(e, finishEventRoute);
               }
          }
     });
};











