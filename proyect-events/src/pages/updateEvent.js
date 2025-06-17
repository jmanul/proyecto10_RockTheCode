import { actionButton, renderItemDetails } from '../components/itemDetails';
import { navigate } from '../utils/logic/navigate';
import { userEventsRoutes } from '../utils/routes/routes';
import { newEventPage } from './createEvents';
import { eventsPage } from './events';
import './updateEvent.css';


export const updateEventPage = async (e, route, extendedEvent, keyMapEvent, textEvents, eventsSection, event) => {
     
   const  routeUpdateEvent = { url: route + `/${event._id}` }

     await navigate(e, routeUpdateEvent);

     const eventsRoute = { action: updateEvent, url: `/events/${event._id}`, event }

     const passesRoute = { action: eventsPage, url: '/events' }
     const postRoute = userEventsRoutes[1]
 
     const actionContainer = await renderItemDetails(extendedEvent, keyMapEvent, textEvents, eventsSection, event, eventsRoute, 'Editar', 'bi-pencil-fill');

     const returnButton = document.querySelector('.button-volver'); 
     if (returnButton) {
          returnButton.remove();
     }
     
     await actionButton('Abonos', passesRoute, actionContainer, 'bi-ticket-detailed')
     await actionButton('Volver', postRoute, actionContainer, 'bi-x-circle-fill')
}


export const updateEvent = async (e, route, objectRoute) => {
    
     const { event } = objectRoute
  
     await newEventPage(e, route, 'PUT', 'Guardar', 'Actualizar evento', event);

     const buttonContainer = document.querySelector('.button-form');
    
     await actionButton('Volver', userEventsRoutes[1], buttonContainer)
 };


//todo:modificar evento -> votones crear pases desde el evnto -> de modificar pases -> accediendo a los pases 