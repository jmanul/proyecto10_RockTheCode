
import { actionButton } from '../components/itemDetails';
import { userEventsRoutes } from '../utils/routes/routes';
import { newEventPage } from './createEvents';
import './createPass.css';
import { createPassCard, renderPassesPage } from './passes';

export function createPassFields(eventStartDate, eventEndDate) {
     return [
          { name: 'namePass', type: 'text', placeholder: 'Nombre del abono', required: false },

          {
               name: 'reservedPlacesPass',
               type: 'number',
               placeholder: 'Número de plazas por abono',
               required: true,
               min: 1
          },

          {
               name: 'maxCapacityPass',
               type: 'number',
               placeholder: 'Abonos disponibles',
               required: true,
               min: 1
          },

          {
               name: 'startDatePass',
               type: 'datetime-local',
               placeholder: 'Fecha de inicio',
               required: true,
               min: new Date(eventStartDate).toISOString().slice(0, 16),
               validate: (value) => {
                    const selectedDate = new Date(value);
                    const minDate = new Date
                         (eventStartDate);
                    const maxEnd = new Date(eventEndDate);
                    return selectedDate >= minDate && selectedDate <= maxEnd
                         ? true
                         : `La fecha debe estar comprendida entre ${minDate.toLocaleString()} y ${maxEnd.toLocaleString()}`;
               }
          },

          {
               name: 'endDatePass',
               type: 'datetime-local',
               placeholder: 'Fecha de fin',
               required: true,
               validate: (value, form) => {
                    const endDate = new Date(value);
                    const startInput = form.querySelector('[name="startDatePass"]');
                    const startDate = new Date(startInput.value);
                    const maxEnd = new Date(eventEndDate);

                    if (isNaN(endDate.getTime()) || isNaN(startDate.getTime())) {
                         return 'Fechas inválidas.';
                    }

                    if (endDate <= startDate) {
                         return 'La fecha de fin debe ser posterior a la de inicio.';
                    }

                    if (endDate > maxEnd) {
                         return `La fecha de fin no puede ser posterior a la del evento: ${maxEnd.toLocaleString()}`;
                    }

                    return true;
               }
          }
     ];
}


export const userEventPasses = async (e, route, objectRoute) => {

     
     const passes = await renderPassesPage(e, route, objectRoute);
     // const actionsRemove = document.querySelectorAll('.add-passes-container');
     // actionsRemove.forEach(element => element.remove()); 

     const addButtonPass = await userAddPass(e, route, objectRoute);

  
     
};

export const userAddPass = async (e, route, objectRoute) => {

     const { event } = objectRoute;

     const addPassRoute = { url: `/passes/event/${event._id}`, action: createPass, return: userEventsRoutes[1], event };

     const passesContainer = document.querySelector('.grid-events');

     if (!passesContainer) {
          
          throw new Error("No se encontró el contenedor de las entradas");
     }

     
     const buttonAddPassContainer = document.createElement('div');
     buttonAddPassContainer.classList.add('flex-container', 'action-container');
     passesContainer.appendChild(buttonAddPassContainer);

     const addButtonPass = await actionButton('Nuevo', addPassRoute, buttonAddPassContainer, 'bi bi-plus-circle-fill')
     const returnButton = document.querySelector('.button-volver');
     buttonAddPassContainer.appendChild(returnButton);

     return passesContainer;

    

}


export const createPass = async (e, route, objectRoute) => {
     const { event } = objectRoute;

     const passFields = createPassFields(event.startDate, event.endDate);

      await newEventPage(e, route, 'POST', 'Crear','Nuevo abono', passFields, renderNewPass)
} 

export const renderNewPass = async (e, route, container, requestObject) => {

     // recibo el objeto route = requestObject completo de navigate con la request para poder acceder al evnto creado

     const { request } = requestObject;
     const newPassCreated = request.pass;
    
     // Seleccionar el contenedor y creamos la card del abono para mostrarlo

     const cardNewPass = createPassCard(newPassCreated );
     const formNewEventContainer = document.querySelector('.grid-events');
     container.innerHTML = `<h2>Nuevo abono creado</h2>`;
     formNewEventContainer.innerHTML = '';
     formNewEventContainer.appendChild(cardNewPass);

      await actionButton('Volver', userEventsRoutes[1], formNewEventContainer)


}

