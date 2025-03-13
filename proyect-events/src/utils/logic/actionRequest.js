import { createMessage } from "../../components/message";
import { processForm } from "./processForm";



export const actionRequest = async (form, route, method, renderFunction, container) => {

    await form.addEventListener('submit', async (e) => {

          e.preventDefault();

          try {

               const request = await processForm(form, route, method, container);

               if (request) {

                    createMessage(request.message, 'success', container);
                    
                    console.log("exitoso:", request.message);

                    await renderFunction(container);
                    return request;
               }

               console.error("Error: Respuesta inválida del servidor.");

          } catch (error) {
               console.error("Error :", error);
          }
     });
}

//todo: tenemos que reetornar message de error o exito y limpiar la pantalla y añadir la route
