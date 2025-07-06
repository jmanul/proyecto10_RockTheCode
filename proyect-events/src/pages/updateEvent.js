import { actionButton, renderItemDetails } from '../components/itemDetails';
import { userEventsRoutes } from '../utils/routes/routes';
import { eventFields, newEventPage, renderNewEvent } from './createEvents';
import { userEventPasses } from './createPass';
import './updateEvent.css';


export const updateEventPage = async (e, route, extendedEvent, keyMapEvent, textEvents, eventsSection, event) => {

     const eventsRoute = { action: updateEvent, url: route, event }

     const passesRoute = { url: `/passes/event/${event._id}`, action: userEventPasses, return: userEventsRoutes[1], event };
 
     const actionContainer = await renderItemDetails(extendedEvent, keyMapEvent, textEvents, eventsSection, event, eventsRoute, 'Editar', 'bi-pencil-fill');

     const returnButton = document.querySelector('.button-volver'); 
     if (returnButton) {
          returnButton.remove();
     }
     
     await actionButton('Abonos', passesRoute, actionContainer, 'bi-ticket-detailed')
     await actionButton('Volver', userEventsRoutes[1], actionContainer, 'bi-x-circle-fill')
}


export const updateEvent = async (e, route, objectRoute) => {
    
     const { event } = objectRoute
  
     await newEventPage(e, route, 'PUT', 'Guardar', 'Actualizar evento', eventFields, renderNewEvent, event);

     const buttonContainer = document.querySelector('.button-form');
    
     await actionButton('Volver', userEventsRoutes[1], buttonContainer)
 };


