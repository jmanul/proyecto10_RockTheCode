import './createEvents.css';
import { createForm } from '../components/form.js';
import { actionRequest } from '../utils/logic/actionRequest.js';
import { createEventsCard } from '../components/cardEvent.js';
import { createLayout } from '../components/layout.js';
import { renderEvents } from './events.js';
import { createList } from '../components/list.js';
import { typesEventsRoutes } from '../utils/routes/routes.js';


const eventFields = [

     { name: 'name', type: 'text', placeholder: 'Nombre del evento', required: true },
     {
          name: 'type',
          type: 'select',
          placeholder: 'Tipo de evento',
          required: false,
          options: [
               'musica',
               'deporte',
               'fiesta',
               'formación',
               'arte',
               'gastronomía',
               'tecnología',
               'otros'
          ]
     },
     { name: 'location', type: 'text', placeholder: 'Lugar', required: true },
     { name: 'adress', type: 'text', placeholder: 'Dirección', required: true },
     { name: 'city', type: 'text', placeholder: 'Ciudad', required: true },
     { name: 'description', type: 'textarea', placeholder: 'Descripción', required: true },
     { name: 'startDate', type: 'datetime-local', placeholder: 'Fecha de inicio', required: true },
     { name: 'endDate', type: 'datetime-local', placeholder: 'Fecha de fin', required: false },
     // {
     //      name: 'eventStatus',
     //      type: 'select',
     //      placeholder: 'Estado del evento',
     //      required: false,
     //      options: [
     //           'not-start',
     //           'postponed',
     //           'cancelled',
     //           'finalized'
     //      ]
     // },
     { name: 'image', type: 'file', placeholder: 'Imagen del evento', required: false },
     { name: 'maxCapacity', type: 'number', placeholder: 'Capacidad máxima', required: true }
];

const appContainer = document.getElementById('app');

export const createEventsPage = async (e, route) => {

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

//      // Crear el layout principal
//      const main = createLayout();
//      if (!main) {
//           throw new Error("No se pudo crear el layout principal.");
//      }
//      // Seleccionar el contenedor de eventos
//      const eventsSection = document.querySelector('.grid-events');
//      eventsSection.style.scrollbarGutter = 'stable both-edges';
//      if (!eventsSection) {
//           throw new Error("No se encontró el contenedor de eventos (.grid-events).");
//      }

//      const textEvents = document.querySelector('.text-events');

//      if (!textEvents) {
//           throw new Error("No se encontró el contenedor de texto (.text-events).");
//      }

//      textEvents.innerHTML = `<h2> Tus Eventos </h2>`;
//      eventsSection.innerHTML = '';

//   console.log(route);

//      // Obtener los datos de los eventos
//      const userEvents = await buildFetchJson({ route });
//      const events = request?.events;

//      // Validar si hay eventos disponibles
//      if (!events || events.length === 0) {
//           eventsSection.innerHTML = "<p>No hay resultados disponibles.</p>";
//           return;
//      }
}




export const createEvents = async (e, route) => {

     try {

          // Seleccionar el contenedor de eventos
          const formNewEventContainer = document.querySelector('.div-passes');
          // formNewEventContainer.style.scrollbarGutter = 'stable both-edges';
          if (!formNewEventContainer) {
               throw new Error("No se encontró el contenedor de eventos (.grid-events).");
          }

          const textNewEvents = document.querySelector('.text-passes');

          if (!textNewEvents) {
               throw new Error("No se encontró el contenedor de texto (.text-events).");
          }

          textNewEvents.innerHTML = `<h2> Nuevo evento </h2>`;
          formNewEventContainer.innerHTML = '';



          // Crear el formulario para la creación de un nuevo evento
          const formNewEvent = await createForm(eventFields, 'Crear');

          if (!formNewEvent) {
               throw new Error("No se pudo crear el formulario para el nuevo evento");
          }

          // Añadir el formulario al contenedor
          formNewEventContainer.appendChild(formNewEvent);

          await actionRequest(formNewEvent, '/events/', 'POST', NewEventPage, appContainer);


     } catch (error) {
          console.error("Error en renderEvents:", error);
          eventsSection.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
     }



}



