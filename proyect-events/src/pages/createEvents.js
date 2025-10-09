import './createEvents.css';
import { FormBuilder } from '../components/form.js';
import { actionRequest } from '../utils/logic/actionRequest.js';
import { createLayout } from '../components/layout.js';
import { renderEvents } from './events.js';
import { createList } from '../components/list.js';
import { userEventsRoutes } from '../utils/routes/routes.js';
import { createEventsCard } from '../components/cardEvent.js';
import { updateEventPage } from './updateEvent.js';
import { actionButton } from '../components/itemDetails.js';
import { buildFetchJson } from '../api/buildFetch.js';

//obtenemos la lista de paises disponibles definida en la API
export const countries = async () => {

     return buildFetchJson({ route: '/countries' })
};

const countriesList = await countries();
const countriesNames = countriesList.map(country => country.name)

export const eventFields = [
     { name: 'name', type: 'text', placeholder: 'Nombre del evento', required: true },
     { name: 'type', type: 'select', placeholder: 'Tipo de evento', required: false, options: ['musica', 'deporte', 'fiesta', 'formación', 'arte', 'gastronomía', 'tecnología', 'otros'] },
     { name: 'location', type: 'text', placeholder: 'Lugar', required: true },
     { name: 'address', type: 'text', placeholder: 'Dirección', required: true },
     { name: 'postalCode', type: 'text', placeholder: 'C.P.', required: true },
     { name: 'city', type: 'text', placeholder: 'Ciudad', required: true },
     { name: 'country', type: 'select', placeholder: 'Pais', required: false, options: countriesNames },
     { name: 'description', type: 'textarea', placeholder: 'Descripción', required: true },
     {
          name: 'startDate', type: 'datetime-local', placeholder: 'Fecha de inicio', required: true,
          min: (() => {
               const now = new Date();
               now.setHours(now.getHours() + 1);
               return now.toISOString().slice(0, 16);
          })(),
          validate: (value) => {
               if (!value) return 'Debes seleccionar una fecha de inicio.';

               const selectedDate = new Date(value);
               const now = new Date();
               now.setHours(now.getHours() + 1); // fecha mínima: 1 hora en el futuro

               return selectedDate > now ? true : 'La fecha de inicio debe ser al menos 1 hora más tarde que la actual.';
          }
     }
     ,
     {
          name: 'endDate', type: 'datetime-local', placeholder: 'Fecha de fin', required: true, validate: (value, form) => {
               const start = new Date(form.querySelector('[name="startDate"]').value);
               const end = new Date(value);
               return end <= start ? 'La fecha de fin debe ser posterior a la de inicio.' : true;
          }
     },

     {
          name: 'image', type: 'file', placeholder: 'Imagen del evento', required: false, validate: (inputElement) => {
               if (!inputElement || !inputElement.files || inputElement.files.length === 0) return true;

               const file = inputElement.files[0];
               const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

               return allowedTypes.includes(file.type) || 'El archivo debe ser una imagen (.jpg, .png, .webp)';
          }
     }

];




export const createEventsPage = async (e, route, routeObject) => {
     
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


     await newEventPage(e, route, 'POST', 'Añadir', 'Nuevo evento', eventFields, renderNewEvent);
};



export const newEventPage = async (e, route, method, text, title, fields, renderAction, returnRoute = userEventsRoutes[1], existingValues = {}) => {


     try {

          // Seleccionar el contenedor de eventos
          const formNewEventContainer = document.querySelector('.grid-events');
          formNewEventContainer.style.scrollbarGutter = 'stable both-edges';
          const gridMain = document.querySelector('.grid-main');
          gridMain.style.gridTemplateColumns = 'auto auto';
          const infoSection = document.getElementById('info-section');
          infoSection?.remove();
          const infoGridSection = document.getElementById('info-grid-section');
          infoGridSection?.remove();

          if (!formNewEventContainer) {
               throw new Error("No se encontró el contenedor de eventos (.grid-events).");
          }

          const textNewEvents = document.querySelector('.text-events');

          if (!textNewEvents) {
               throw new Error("No se encontró el contenedor de texto (.text-events).");
          }

          textNewEvents.innerHTML = `<h2>${title}</h2>`;
          formNewEventContainer.innerHTML = '';

          // Crear el formulario para la creación de un nuevo evento
          const builder = new FormBuilder(fields, text, existingValues);
          const formNewEvent = await builder.createForm();


          if (!formNewEvent) {
               throw new Error("No se pudo crear el formulario para el nuevo evento");
          }

          // Añadir el formulario al contenedor
          formNewEventContainer.appendChild(formNewEvent);

          await actionRequest(formNewEvent, builder, route, method, renderAction, formNewEventContainer, textNewEvents, returnRoute);

          const buttonContainer = formNewEvent.querySelector('.button-form');

          await actionButton('Volver', returnRoute, buttonContainer)


     } catch (error) {
          console.error("Error en renderEvents:", error);
          formNewEventContainer.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
     }



}

export const eventsUser = async (e, route) => {

     const updateImageContainer = document.querySelector('.backgroun-image-preview');
     if (updateImageContainer) {

          updateImageContainer.remove();
     }
     const events = await renderEvents(e, route, { showPastEvents: true, onCardClick: updateEventPage });

     if (!events) {

          return
     }

     const textEventsUser = document.querySelector('.text-events');
     textEventsUser.innerHTML = `<h2>Eventos creados</h2>`;

     const eventsUserCar = document.querySelectorAll('.event-card');

     events.forEach((event, index) => {

          const eventCard = eventsUserCar[index];

          if (!eventCard) return;

          const asistentNumber = document.createElement('div');
          asistentNumber.classList.add('flex-container', 'asistent-number');

          asistentNumber.innerHTML = `<div class= "flex-container"><span><i class="bi bi-people-fill"></i></span><span>${event.totalReservedPlaces} asistentes de ${event.maxCapacity}</span></div>`;


          eventCard.appendChild(asistentNumber);
     });



};

export const renderNewEvent = async (e, route, requestObject, container = null) => {

     // recibo el objeto route = requestObject completo de navigate con la request para poder acceder al evnto creado
     const editIconImage = document.querySelector('.edit-icon-img');

     if (editIconImage) {

          editIconImage.remove();
     }

     const { request, returnRoute } = requestObject;
     const newEventCreated = request.event

     let finalReturRoute = returnRoute

     if (!returnRoute) {

          finalReturRoute = userEventsRoutes[1]
     }

     // Seleccionar el contenedor de eventos y creamos la card del evento para mostrarlo

     const cardEvent = createEventsCard(newEventCreated);
     const formNewEventContainer = document.querySelector('.grid-events');
     if (container || !container === null || !container === undefined) {

          container.innerHTML = `<h2>Nuevo evento creado</h2>`;

     }

     formNewEventContainer.innerHTML = '';
     formNewEventContainer.appendChild(cardEvent);

     await actionButton('Volver', finalReturRoute, formNewEventContainer)


}


