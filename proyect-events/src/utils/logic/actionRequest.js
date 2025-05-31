

import { navigate } from "./navigate";
import { processForm } from "./processForm";



export const actionRequest = async (form, builder, route, method, renderFunction, container, ...rest) => {

    await form.addEventListener('submit', async (e) => {

         e.preventDefault();

         // Validación antes del envío
         const isValid = builder ? builder.validateAllFields() : form.checkValidity();

         if (!isValid) {
              console.warn('Formulario inválido. Corrige los errores antes de enviar.');
              return;
         }

          try {

               const request = await processForm(form, route, method, container);

               if (request) {

                    const routeAction = { url: route, action: renderFunction, request };

                    navigate(e, routeAction, ...rest);
                    return request;
               }

               console.error("Error: Respuesta inválida del servidor.");

          } catch (error) {
               console.error("Error :", error);
          }
     });
}


