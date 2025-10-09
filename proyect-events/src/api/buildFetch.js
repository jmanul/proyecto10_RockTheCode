import { createMessage } from "../components/message";
import { createSpinner, hideSpinner, showSpinner } from "../components/spinner";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const spinner = createSpinner();
document.body.appendChild(spinner);

export const buildFetchJson = async ({ route, method = "GET", bodyData = null, container = null }) => {
     try {

          showSpinner(spinner);    

          const options = {
               method,
               credentials: "include",
               headers: {
                    "Content-Type": "application/json",
               },
          };

          // Solo agrega el body si hay datos que enviar y el método no es GET
          if (bodyData && method !== "GET") {
               options.body = JSON.stringify(bodyData);
          }

          const response = await fetch(API_BASE_URL + route, options);

          const data = await response.json();

          if (!response.ok && data.message) {

                createMessage(data.message, 'error', container);
                
               return;

          }

          if (response.status === 204) {

               createMessage('No se encontro ningun resultado', 'error', container);

               return null;
                   
          }

          if (response.ok && data.message) {

               window.history.pushState({}, "", route);
               createMessage(data.message, 'success', container);

          };

          return data;


     } catch (error) {
          
          console.error("Error en la solicitud:", error.message);
          throw error;
         

     } finally {
          hideSpinner(spinner);
     }
};



export const buildFetchFormdata = async ({ route, method, dataForm, container }) => {

     try {
         
          showSpinner(spinner);

          const response = await fetch(API_BASE_URL + route, {
               method: method,
               credentials: "include",
               body: dataForm,
          });

          const data = await response.json();

          if (!response.ok && data.message) {

               createMessage(data.message, 'error', container);

               return;
             
          }

          if (response.status === 204) {

               createMessage('No se encontro ningun resultado', 'error', container);

               return null;

          }

          if (response.ok && data.message) {
               
               window.history.pushState({}, "", route);
               createMessage(data.message, 'success', container);

          };

          return data;

     } catch (error) {

          console.error("Error en la solicitud:", error.message);
          throw error;

         

     } finally {

          hideSpinner(spinner);

     }
}



