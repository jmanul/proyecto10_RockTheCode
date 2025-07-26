import { FormBuilder } from '../components/form';
import { actionButton } from '../components/itemDetails';
import { actionRequest } from '../utils/logic/actionRequest';
import { createPassFields, renderNewPass } from './createPass';
import './updatePass.css';

export const updatePass = async (e, route, objectRoute) => {  
     const { pass, passesRoute, event, container } = objectRoute
     
     try {

          const passFields = createPassFields(event.startDate, event.endDate);
          
          const builder = new FormBuilder(passFields, 'Guardar', pass);
          const updatePassForm = await builder.createForm(false);

          if (!updatePassForm) {
               throw new Error("No se pudo crear el formulario para el abono");
          }

          // Añadir el formulario al contenedor
          const textInfo = document.createElement('h4');
          textInfo.innerText = 'Editar Abono';
          textInfo.classList.add('title-form');

          container.innerHTML = '';
          container.appendChild(textInfo);
          container.appendChild(updatePassForm);

          await actionRequest(updatePassForm, builder, `/passes/event/${event._id}/pass/${pass._id}`, 'PUT', renderNewPass, container, passesRoute, textInfo, 'Abono Actualizado');

         
          const buttonContainer = updatePassForm.querySelector('.button-form');

          await actionButton('Volver', passesRoute, buttonContainer);


     } catch (error) {
         
          container.innerHTML = "<p>Ocurrió un error al cargar el abono.</p>";
     }



}