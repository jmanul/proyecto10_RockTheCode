

import { createMessage } from "../../components/message";
import { navigate } from "./navigate";
import { processForm } from "./processForm";



export const actionRequest = async (form, builder, route, method, renderFunction, container, ...rest) => {
     console.log(builder, 'builder');
     console.log(form, 'form');
     form.addEventListener('submit', async (e) => {

         e.preventDefault();

         // Validación antes del envío
         const isValid = builder ? builder.validateAllFields() : form.checkValidity();

         if (!isValid) {
              createMessage('Formulario inválido. Corrige los errores antes de enviar.', 'alert-action');
              return;
         }
     

          try {

               if (method === 'PUT') {
                    
                    // eliminamos del fromulario los campos que no han sido modificados
                    const changedData = builder.getChangedFields();

                    for (const key in changedData) {
                         form.append(key, changedData[key]);
                    }
                  
               }

               const request = await processForm(form, route, method, container);

               if (request) {

                    const routeAction = { url: route, action: renderFunction, request };

                    navigate(e, routeAction, ...rest);
                    return request;
               }

               createMessage("Error: Respuesta inválida del servidor.");

          } catch (error) {

               createMessage("Error :", error);
          }
     });
}


