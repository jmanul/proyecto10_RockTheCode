
import { buildFetchJson } from '../api/buildFetch';
import { actionButton, itemDetails } from '../components/itemDetails';
import { generateTicket } from './generateTicket';
import { dateFormat } from '../utils/logic/dateFormat';
import { navigate } from '../utils/logic/navigate';
import './passes.css'
import { userRoutes } from '../utils/routes/routes';

const keyMapPass = {
     namePass: { icon: "bi bi-ticket-detailed" },
     passPrice: { icon: "bi bi-currency-euro" },
     reservedPlacesPass: { icon: "bi bi-people-fill" },
     startDateFormatted: { icon: "bi bi-calendar-check" },
     startTimeFormatted: { icon: "bi-clock" },
     endDateFormatted: { icon: "bi-calendar-x" },

};



export const renderPasesPage = async (e, route) => {
     try {


          // Obtener los pases desde el servidor
          const passes = await buildFetchJson({ route });

          // Seleccionar el contenedor de eventos
          const eventsSection = document.querySelector('.grid-events');
          if (!eventsSection) {
               throw new Error("No se encontró el contenedor de eventos (.grid-events).");
          }

          eventsSection.innerHTML = '';

          // Verificar si hay pases disponibles
          if (!passes || passes.length === 0) {
               eventsSection.innerHTML = "<p>No hay abonos disponibles.</p>";
               return;
          }

          // Iterar sobre los pases
          for (const pass of passes) {
               try {
                    // Convertir fechas
                    const passEndDate = new Date(pass.endDatePass);
                    const passStartDate = new Date(pass.startDatePass);

                    const nowDate = new Date();

                    // Verificar que el pase aún esté activo
                    if (passEndDate.getTime() > nowDate.getTime() && pass.totalReservedPlacesPass < pass.maxCapacityPass) {

                         
                         // Preparar datos adaptados para render
                         const extendedPass = {
                              ...pass,
                              startDateFormatted: dateFormat(passStartDate).date,
                              startTimeFormatted: dateFormat(passStartDate).time,
                              endDateFormatted: dateFormat(passEndDate).date
                         };

                         // Crear el contenedor del pase
                         const passContainer = document.createElement('div');
                         passContainer.classList.add('select-card', 'flex-container')
                         passContainer.innerHTML = itemDetails(extendedPass, keyMapPass);
                         eventsSection.appendChild(passContainer);

                         // Crear el botón de acción
                         const addPassesContainer = document.createElement('div');
                         addPassesContainer.classList.add('flex-container', 'add-passes-container');
                         addPassesContainer.innerHTML = ` <div class:"flex-container quantity-group "><input 
    id="quantity-ticket"                     
    type="number" 
    min="1" 
    max="5" 
    value="0"
    class="number-tickets"
    required
  >   <span class="error-message" style="color: red; display: none;">
    El valor debe estar entre 1 y 5
  </span></div>`;
                         const quantityInput = addPassesContainer.querySelector('.number-tickets');
                         const errorMessage = addPassesContainer.querySelector('.error-message');
                         const button = await actionButton('Añadir', route, addPassesContainer);
                         const buttonExit = await actionButton('Cancelar', userRoutes[1], addPassesContainer);
                         passContainer.appendChild(addPassesContainer);
                         // Configurar la navegación al hacer clic en el botón

                         button.addEventListener('click', (e) => {
                              const quantity = parseInt(quantityInput.value);
                              if (quantity < 1 || quantity > 5) {
                                  
                                    errorMessage.style.display = 'block';
                                    numberInput.value = 1; 
                              }
                               else {
                                   errorMessage.style.display = 'none';
                               }
                              const passRoute = {
                                   url: {
                                        url: `/users/pass/${pass._id}`, reservedPlaces: quantity
                                   }, action: generateTicket
                              };
                              navigate(e, passRoute);
                         });

                    } else {

                         eventsSection.innerHTML = `<h3>Actualmente no hay entradas disponibles para este evento</h3> `;

                         const button = await actionButton('volver', userRoutes[1], eventsSection);

                         button.style.backgroundColor = 'red'

                    }

               } catch (error) {
                    console.error(`Error al procesar el pase: ${pass?.name}`, error);
               }
          }
     } catch (error) {
          console.error("Error en renderPasesPage:", error);
          const eventsSection = document.querySelector('.grid-events');
          eventsSection.innerHTML = `<p>Ocurrió un error al cargar los abonos.}</p>`;
          const button = await actionButton('volver', userRoutes[1], eventsSection);
         
          button.style.backgroundColor = 'red'
     }
};



