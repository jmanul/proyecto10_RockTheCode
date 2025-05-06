import { createMessage } from "../../components/message";
import { processForm } from "./processForm";



export const actionRequest = async (form, route, method, renderFunction, container) => {

    await form.addEventListener('submit', async (e) => {

         e.preventDefault();

          try {

               const request = await processForm(form, route, method, container);
               console.log(request);

               if (request) {

                    await renderFunction(container);
                    return request;
               }

               console.error("Error: Respuesta inválida del servidor.");

          } catch (error) {
               console.error("Error :", error);
          }
     });
}


