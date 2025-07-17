import './updateEvent.css';
import { FormBuilder } from '../components/form';
import { actionButton, renderItemDetails } from '../components/itemDetails';
import { actionRequest } from '../utils/logic/actionRequest';
import { userEventsRoutes } from '../utils/routes/routes';
import { eventFields, renderNewEvent } from './createEvents';
import { userEventPasses } from './createPass';


export const imageFields = [

     {
          name: 'image', type: 'file', placeholder: 'Seleccionar Imagen', required: false, validate: (inputElement) => {
               if (!inputElement || !inputElement.files || inputElement.files.length === 0) return true;

               const file = inputElement.files[0];
               const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

               return allowedTypes.includes(file.type) || 'El archivo debe ser una imagen (.jpg, .png, .webp)';
          }
     }

];




export const updateEventPage = async (e, route, extendedEvent, keyMapEvent, textEvents, eventsSection, event, returnRoute) => {
     
   
     const eventsRoute = { action: updateEvent, url: route, event, returnRoute }

     const passesRoute = { url: `/passes/event/${event._id}`, action: userEventPasses, returnRoute, event };

     const actionContainer = await renderItemDetails(extendedEvent, keyMapEvent, textEvents, eventsSection, event, eventsRoute, 'Editar', 'bi-pencil-fill');

     const returnButton = document.querySelector('.button-volver');
     if (returnButton) {
          returnButton.remove();
     }

     await actionButton('Abonos', passesRoute, actionContainer, 'bi-ticket-detailed')
     await actionButton('Volver', userEventsRoutes[1], actionContainer, 'bi-x-circle-fill')
}


export const updateEvent = async (e, route, objectRoute) => {
     const { event, returnRoute } = objectRoute
     const eventSection = document.querySelector('.events-section');
     const updateEventContainer = document.querySelector('.grid-events');
     const updateEventImageContainer = document.querySelector('.miniature-img');
     const eventImage = document.querySelector('.miniature-img img');
     const currentImage = eventImage.src;

     const editIconImage = document.createElement('div');
     editIconImage.classList.add('flex-container', 'edit-icon-img')
     updateEventImageContainer.appendChild(editIconImage);
     editIconImage.innerHTML = `<i class="bi bi-camera-fill"></i>`;
     
     try {
          const builder = new FormBuilder(eventFields, 'Guardar', event);
          const updateEventform = await builder.createForm(false);
          editIconImage.addEventListener(`click`, (e) => {

               updateImage(e, route, eventSection, event)
          })

          if (!updateEventform) {
               throw new Error("No se pudo crear el formulario para el nuevo evento");
          }

          // Añadir el formulario al contenedor
          updateEventContainer.innerHTML = '';
          updateEventContainer.appendChild(updateEventform);

          await actionRequest(updateEventform, builder, route, 'PUT', renderNewEvent, updateEventContainer, event);

         
          const buttonContainer = updateEventform.querySelector('.button-form');

          await actionButton('Volver', returnRoute, buttonContainer)


     } catch (error) {
          console.error("Error en renderEvents:", error);
          updateEventContainer.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
     }



}


export const updateImage = async (e, route, container, event) => {

     const eventImage = document.querySelector('.miniature-img img');
     const currentImage = eventImage.src;
    
     const background = document.createElement('div');
     background.classList.add('flex-conatiner', 'backgroun-image-preview')
     background.innerHTML = '';
     const previewImagen = document.createElement('div');
     previewImagen.innerHTML = `<img src=${currentImage} alt="imagen del evento">`
     previewImagen.classList.add('flex-container', 'preview-image');
     background.appendChild(previewImagen)
     previewImagen.style.viewTransitionClass = 'view-transition-opacity'
     container.appendChild(background);


     try {
          const builder = new FormBuilder(imageFields, 'Guardar', event);
          const updateImageform = await builder.createForm();
          updateImageform.classList.add('form-image');
          const labelInputUpload = updateImageform.querySelector('label');
          labelInputUpload.className = 'label-file-upload';
          labelInputUpload.htmlFor = 'file-input';
          const inputUpload = updateImageform.querySelector('input');
         
          // renderizacion de archivo seleccionado
          inputUpload.addEventListener('change', () => {

               if (inputUpload.files.length > 0) {

                    const file = inputUpload.files[0];
                    const fileNameExt = file.name.split('.').pop().toLowerCase();
                    const fileName = file.name.replace(/\.\w+$/, '');
                  
                    // Cambiar texto del label
                    labelInputUpload.textContent = file.name;
                    labelInputUpload.style.fontSize = '1rem';
                  

                    // Previsualizar imagen seleccionada
                    const reader = new FileReader();

                    reader.onload = (e) => {
                         
                         const previewFile = document.createElement('img');
                         previewFile.classList.add('preview-file-img')
                     
                         // URL temporal del archivo
                         const url = e.target.result; 
                         previewFile.src = url;
                         previewFile.alt = 'imagen seleccionada'
                         previewFile.style.viewTransitionName = `${fileName}-${event._id}`
                        
                         const validExtensions = ['svg', 'jpg', 'webp', 'png', 'jpeg'];
                         if (validExtensions.includes(fileNameExt)) {
                              
                              previewImagen.innerHTML = '';
                              previewImagen.appendChild(previewFile);
                              requestAnimationFrame(() => {
                                   previewFile.classList.add('loaded');
                              });
                              previewImagen.appendChild(updateImageform);
                         }
                        
                    };
                    
                    // Lee el archivo como DataURL
                    reader.readAsDataURL(file); 
               }
                   
          });

          if (!updateImageform) {
               throw new Error("No se pudo crear el formulario para la nueva imagen");
          }

          // Añadir el formulario al contenedor
          previewImagen.appendChild(updateImageform);

          await actionRequest(updateImageform, builder, route, 'PUT', closeUpdateImage, container);

          const buttonContainer = updateImageform.querySelector('.button-form');

          await actionButton('Volver', userEventsRoutes[1], buttonContainer)


     } catch (error) {
          console.error("Error en renderEvents:", error);
          previewImagen.innerHTML = "<p>Ocurrió un error al cargar la imagen</p>";
     }

}


export const closeUpdateImage = async (e, route , objectRoute) => {

     const { request } = objectRoute;
     const updateImageContainer = document.querySelector('.backgroun-image-preview');
     updateImageContainer.remove();
     const eventImage = document.querySelector('.miniature-img img');
     eventImage.src = request.event.image

    
}



