
import { createMessage } from "../../components/message";
import { navigate } from "./navigate";
import { processForm } from "./processForm";



export const actionRequest = async (form, builder, route, method, renderFunction, container, ...rest) => {

     
     form.addEventListener('submit', async (e) => {
          e.preventDefault();

          const isValid = builder ? builder.validateAllFields() : form.checkValidity();

          if (!isValid) {
               createMessage('Formulario inválido. Corrige los errores antes de enviar.');
               return;
          }

          let finalForm = form;

          if (method === 'PUT') {
               
               const changedForm = await builder.getChangedForm(form);
               if (!changedForm) {
                    createMessage('No has modificado ningún campo');
                    return;
               }
             
               finalForm = changedForm;

          }

          let transitionClass = 'view-transition-form';

          Array.from(finalForm.elements).forEach((element) => {
     
               if (element.placeholder === 'Subir Imagen') {
                    const { type, files } = element;

                    if (type === 'file' && files.length > 0) {
                       
                         transitionClass = 'view-transition-opacity';

                    }
               }
          });

          try {
               const request = await processForm(finalForm, route, method, container);

               if (request) {

                    const routeAction = {
                         url: route,
                         action: renderFunction,
                         transitionClass,
                         request
                       
                    };
                    await navigate(e, routeAction, ...rest);

                    return request;
               }

               createMessage("Error: Respuesta inválida del servidor.");
          } catch (error) {
               createMessage("Error en el envío:", error);
          }
     });
}


