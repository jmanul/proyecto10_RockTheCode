
import { navigate } from "./navigate";
import { processForm } from "./processForm";



export const actionRequest = async (form, route, method, renderFunction, container, ...rest) => {

    await form.addEventListener('submit', async (e) => {

         e.preventDefault();

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


