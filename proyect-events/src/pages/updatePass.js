import { FormBuilder } from '../components/form';
import { actionButton } from '../components/itemDetails';
import { actionRequest } from '../utils/logic/actionRequest';
import { createPassFields, renderNewPass } from './createPass';
import './updatePass.css';

export const updatePass = async (e, route, objectRoute) => {  
     const { pass, passesRoute, event, container } = objectRoute
    
   
     
     try {

          const passFields = createPassFields(event.startDate, event.endDate);
          console.log(passFields, 'fields');
          
          const builder = new FormBuilder(passFields, 'Guardar', pass);
          const updatePassForm = await builder.createForm(false);

          if (!updatePassForm) {
               throw new Error("No se pudo crear el formulario para el nuevo evento");
          }

          // Añadir el formulario al contenedor
          container.innerHTML = '';
          container.appendChild(updatePassForm);

          await actionRequest(updatePassForm, builder, `/passes/event/${event._id}/pass/${pass._id}`, 'PUT', renderNewPass, container, passesRoute);

         
          const buttonContainer = updatePassForm.querySelector('.button-form');

          await actionButton('Volver', passesRoute, buttonContainer);


     } catch (error) {
          console.error("Error en renderEvents:", error);
          container.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
     }



}