
import { FormBuilder } from '../components/form';
import { actionButton } from '../components/itemDetails';
import { actionRequest } from '../utils/logic/actionRequest';

import './createPass.css';
import { createPassCard, renderPassesPage } from './passes';

export function createPassFields(eventStartDate, eventEndDate, reservedPlaces = null) {
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
               min: 1,
               validate: (value) => {

                    if (reservedPlaces !== null && value < reservedPlaces) {

                         return `El aforo no puede ser menor que las ${reservedPlaces} plazas ya reservadas`
                    }
                    return true
               }
          },

          {
               name: 'startDatePass',
               type: 'datetime-local',
               placeholder: 'Fecha de inicio',
               required: false,
               min: new Date(eventStartDate).toISOString().slice(0, 16),
               validate: (value) => {
                    if (!value) { return true };
                    const selectedDate = new Date(value);
                    const minDate = new Date
                         (eventStartDate);
                         
                    const maxEnd = new Date(eventEndDate);
                    return selectedDate >= minDate && selectedDate <= maxEnd
                         ? true
                         : `La fecha debe estar comprendida entre ${minDate.toLocaleString()} y ${maxEnd.toLocaleString() }`;
               }
          },

          {
               name: 'endDatePass',
               type: 'datetime-local',
               placeholder: 'Fecha de fin',
               required: false,
               validate: (value, form) => {

                    if (!value) { return true };
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
                         return `La fecha de fin no puede ser posterior a la del evento: ${maxEnd.toLocaleString() }`;
                    }

                    return true;
               }
          },

          {
               name: 'isPrivated',
               type: 'select',
               placeholder: 'Tipo de pase',
               required: false,
               options: [
                    { value: 'false', label: 'Público' },
                    { value: 'true', label: 'Privado (solo invitados)' }
               ]
          },

          {
               name: 'guestList',
               type: 'guestList',
               placeholder: 'Lista de invitados',
               required: false,
               dependsOn: 'isPrivated',
               showWhen: 'true'
          }
     ];
}


export const userEventPasses = async (e, route, objectRoute) => {

     
     const passes = await renderPassesPage(e, route, objectRoute);

     const addButtonPass = await userAddPass(e, route, objectRoute);

  
     
};

export const userAddPass = async (e, route, objectRoute) => {
    
     const { event } = objectRoute;

     const passesContainer = document.querySelector('.grid-events');

     if (!passesContainer) {
          
          throw new Error("No se encontró el contenedor de las entradas");
     }


     const addPassRoute = { url: `/passes/event/${event._id}`, action: createPass, eventRoute: objectRoute, event, container: passesContainer, title:` Crea un nuevo abono`,description:`crea un nuevo abono para ${event.name}` };
     
     const actionContainer = passesContainer.querySelector('.action-container');
     await actionButton('Nuevo', addPassRoute, actionContainer);
     actionContainer.style.flexDirection = 'row-reverse'

     return passesContainer; 

}


export const createPass = async (e, route, objectRoute) => {
    
     const { event, eventRoute, container } = objectRoute;
       
          try {
     
               const passFields = createPassFields(event.startDate, event.endDate);
               
               const builder = new FormBuilder(passFields, 'Guardar');
               const newPassForm = await builder.createForm(false);
     

               if (!newPassForm) {
                    throw new Error("No se pudo crear el formulario para el nuevo abono");
               }
               const textInfo = document.createElement('h4');
               textInfo.innerText = 'Nuevo Abono';
               textInfo.classList.add('title-form');
            
               container.innerHTML = '';
               container.appendChild(textInfo);
               container.appendChild(newPassForm);
     
               await actionRequest(newPassForm, builder, route, 'POST', renderNewPass, container, eventRoute, textInfo, 'Abono Añadido');
     
              
               const buttonContainer = newPassForm.querySelector('.button-form');
     
               await actionButton('Volver', eventRoute, buttonContainer);
     
     
          } catch (error) {
               console.error("Error en renderNewPass:", error);
               container.innerHTML = "<p>Ocurrió un error al cargar el abono.</p>";
          }
} 

export const renderNewPass = async (e, route, requestObject, returnRoute, titleForm, textInfo) => {
     
   
     // recibo el objeto requestObject completo de navigate con la request para poder acceder al pase creado y returnRoute pra poder volver a la vista de los pases

     const { request } = requestObject;
     const newPassCreated = request.pass;
    
     // Seleccionar el contenedor y creamos la card del abono para mostrarlo

     const cardNewPass = createPassCard(newPassCreated );
     const formNewEventContainer = document.querySelector('.grid-events');
     formNewEventContainer.innerHTML = '';
     titleForm.innerText = textInfo
     formNewEventContainer.appendChild(titleForm);
     formNewEventContainer.appendChild(cardNewPass);

      await actionButton('Volver', returnRoute, formNewEventContainer)


}



