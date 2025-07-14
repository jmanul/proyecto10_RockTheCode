import { FormBuilder } from '../components/form';
import { actionButton, renderItemDetails } from '../components/itemDetails';
import { actionRequest } from '../utils/logic/actionRequest';
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
     const updateEventContainer = document.querySelector('.grid-events');
   
     try{
          const builder = new FormBuilder(eventFields, 'Guardar', event);
          const updateEventform = await builder.createForm();
        
     
          if (!updateEventform) {
                    throw new Error("No se pudo crear el formulario para el nuevo evento");
               }
           
          // Añadir el formulario al contenedor
          updateEventContainer.innerHTML = '';
          updateEventContainer.appendChild(updateEventform);
             
          await actionRequest(updateEventform, builder, route, 'PUT', renderNewEvent, updateEventContainer);
          const buttonContainer = document.querySelector('.button-form');

          await actionButton('Volver', userEventsRoutes[1], buttonContainer)
              
     
          } catch (error) {
               console.error("Error en renderEvents:", error);
          updateEventContainer.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
          }
     
     
     
     }

  
 


