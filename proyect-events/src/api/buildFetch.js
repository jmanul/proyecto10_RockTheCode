import { createMessage } from "../components/message";
import { createSpinner, hideSpinner, showSpinner } from "../components/spinner";

const appContainer = document.getElementById('app');
const API_BASE_URL = import.meta.env.VITE_API_URL;
const spinner = createSpinner();
appContainer.appendChild(spinner);

export const buildFetchJson = async (route, method = "GET", bodyData = null, messageContainer) => {
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

          if (!response.ok) {

                createMessage(messageContainer, data.message, 'error');
               
                throw new Error(`HTTP error! Status: ${data.message}`);
             

               
          }

          if (response.status === 204) {

               return null;
              
          }
          
          history.pushState({}, "", route);

          return data;


     } catch (error) {
          console.error("Error en la solicitud:", error.message);
          throw error;
         

     } finally {
          hideSpinner(spinner);
     }
};



export const buildFetchFormdata = async (route, method, dataForm, messageContainer) => {

     try {
          showSpinner(spinner);

          const response = await fetch(API_BASE_URL + route, {
               method: method,
               credentials: "include",
               body: dataForm,
          });

          const data = await response.json();

          if (!response.ok) {
               throw new Error(`HTTP error! Status: ${data.message}`);
          }

          history.pushState({}, "", route);

          return data;

     } catch (error) {
          console.error("Error en la solicitud:", error.message);
          throw error;

         

     } finally {

          hideSpinner(spinner);

     }
}



