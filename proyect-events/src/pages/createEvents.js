import './createEvents.css';
import { FormBuilder } from '../components/form.js';
import { actionRequest } from '../utils/logic/actionRequest.js';
import { createLayout } from '../components/layout.js';
import { renderEvents } from './events.js';
import { createList } from '../components/list.js';
import { userEventsRoutes } from '../utils/routes/routes.js';
import { createEventsCard } from '../components/cardEvent.js';


export const eventFields = [
     { name: 'name', type: 'text', placeholder: 'Nombre del evento', required: true },
     {
          name: 'type',
          type: 'select',
          placeholder: 'Tipo de evento',
          required: false,
          options: ['musica', 'deporte', 'fiesta', 'formación', 'arte', 'gastronomía', 'tecnología', 'otros']
     },
     { name: 'location', type: 'text', placeholder: 'Lugar', required: true },
     { name: 'adress', type: 'text', placeholder: 'Dirección', required: true },
     { name: 'city', type: 'text', placeholder: 'Ciudad', required: true },
     { name: 'description', type: 'textarea', placeholder: 'Descripción', required: true },
     { name: 'startDate', type: 'datetime-local', placeholder: 'Fecha de inicio', required: true },
     { name: 'endDate', type: 'datetime-local', placeholder: 'Fecha de fin', required: false },
     {
          name: 'eventStatus',
          type: 'select',
          placeholder: 'Estado del evento',
          required: false,
          options: ['not-start', 'postponed', 'cancelled', 'finalized']
     },
     { name: 'image', type: 'file', placeholder: 'Imagen del evento', required: false },
     { name: 'maxCapacity', type: 'number', placeholder: 'Capacidad máxima', required: true, min: 1 }
];


export const createEventsPage = async (e, route) => {

     try {
          // Crear el layout principal
          const appContainer = document.getElementById('app');
          if (!appContainer) {
               throw new Error("No se encontró el contenedor principal (#app).");
          }

          const main = createLayout(appContainer);

          // Crear el menu de usuario
          const eventsUserMenu = createList('events-user-menu', userEventsRoutes);
          if (!eventsUserMenu) {
               throw new Error("No se pudo crear menu de  evntos de usuario");
          }
          main.prepend(eventsUserMenu);

          // Renderizar los eventos
          await eventsUser(e, route);
          

     } catch (error) {
          console.error("Error en eventsPage:", error);
        
          if (appContainer) {
               appContainer.innerHTML = "<p>Ocurrió un error al cargar la página de eventos.</p>";
          }
     }
}

export const createEvent = async (e, route) => {

     try {

          // Seleccionar el contenedor de eventos
          const formNewEventContainer = document.querySelector('.grid-events');
           formNewEventContainer.style.scrollbarGutter = 'stable both-edges';
          if (!formNewEventContainer) {
               throw new Error("No se encontró el contenedor de eventos (.grid-events).");
          }

          const textNewEvents = document.querySelector('.text-events');

          if (!textNewEvents) {
               throw new Error("No se encontró el contenedor de texto (.text-events).");
          }

          textNewEvents.innerHTML = `<h2> Nuevo evento </h2>`;
          formNewEventContainer.innerHTML = '';



          // Crear el formulario para la creación de un nuevo evento
          const builder = await new FormBuilder(eventFields, 'Crear');
          const formNewEvent = await builder.createForm();

          if (!formNewEvent) {
               throw new Error("No se pudo crear el formulario para el nuevo evento");
          }

          // Añadir el formulario al contenedor
          formNewEventContainer.appendChild(formNewEvent);

          const newEvent = await actionRequest(formNewEvent,builder, route, 'POST', pageNewEvent, formNewEventContainer, textNewEvents);

     } catch (error) {
          console.error("Error en renderEvents:", error);
          formNewEventContainer.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
     }



}

export const eventsUser = async (e, route) => {

     await renderEvents(e, route);

     const textEventsUser = document.querySelector('.text-events');
     textEventsUser.innerHTML = `<h2>Eventos creados</h2>`;

    
};

export const pageNewEvent = async (e, route, container, requestObject) => {

     // recibo el objeto route = requestObject completo de navigate con la request para poder acceder al evnto creado

     const { request } = requestObject;
     const newEventCreated = request.newEvent
     
     // Seleccionar el contenedor de eventos y creamos la card del evento para motrarlo

     const cardEvent = createEventsCard(newEventCreated);
     const formNewEventContainer = document.querySelector('.grid-events');
     container.innerHTML = `<h2>Nuevo evento creado</h2>`;
     formNewEventContainer.innerHTML = '';
     formNewEventContainer.appendChild(cardEvent);
     
     
}


// todo: maneho de errores de introduccion de datos y modificacion de datos con formulario condatos existentes

