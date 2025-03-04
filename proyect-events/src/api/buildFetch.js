import { createSpinner, hideSpinner, showSpinner } from "../components/spinner";

const appContainer = document.getElementById('app');
const API_BASE_URL = import.meta.env.VITE_API_URL;
const spinner = createSpinner();
appContainer.appendChild(spinner);

export const buildFetchJson = async (route, method = "GET", data = null) => {
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
          if (data && method !== "GET") {
               options.body = JSON.stringify(data);
          }

          const response = await fetch(API_BASE_URL + route, options);

          if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
          }

          if (response.status === 204) {

               return null;
              
          }

          return await response.json();


     } catch (error) {
          console.error("Error en la solicitud:", error.message);
          throw error;

     } finally {
          hideSpinner(spinner);
     }
};



export const buildFetchFormdata = async (route, method, dataForm) => {

     try {
          showSpinner(spinner);

          const response = await fetch(API_BASE_URL + route, {
               method: method,
               credentials: "include",
               body: dataForm,
          });

          if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          return data;

     } catch (error) {
          console.error("Error en la solicitud:", error.message);
          throw error;

     } finally {

          hideSpinner(spinner);

     }
}



