
import { buildFetchJson } from '../api/buildFetch';
import { actionButton, itemDetails } from '../components/itemDetails';
import { generateTicket } from './generateTicket';
import { dateFormat } from '../utils/logic/dateFormat';
import { navigate } from '../utils/logic/navigate';
import './passes.css'
import { eventsPage } from './events';

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
                    if (passEndDate.getTime() > nowDate.getTime() && pass.totalReservedPlaces < pass.maxCapacity) {
                         // Preparar datos adaptados para render
                         const extendedPass = {
                              ...pass,
                              startDateFormatted: dateFormat(passStartDate).date,
                              startTimeFormatted: dateFormat(passStartDate).time,
                              endDateFormatted: dateFormat(passEndDate).date
                         };

                         // Crear el contenedor del pase
                         const passContainer = document.createElement('div');
                         passContainer.classList.add('select-card','flex-container')
                         passContainer.innerHTML = itemDetails(extendedPass, keyMapPass);
                         eventsSection.appendChild(passContainer);

                         // Crear el botón de acción
                         const addPasessContainer = document.createElement('div');
                         addPasessContainer.classList.add('flex-container', 'add-passes-container');
                         addPasessContainer.innerHTML = ` <input 
    type="number" 
    min="1" 
    max="5" 
    value="0"
    class="number-tickets"
  >`;                     
                         const quantityInput = addPasessContainer.querySelector('.number-tickets');
                         const button = await actionButton('Añadir', route, addPasessContainer);
                         passContainer.appendChild(addPasessContainer);
                         // Configurar la navegación al hacer clic en el botón
                        
                         button.addEventListener('click', (e) => {
                              const quantity = parseInt(quantityInput.value); 
                              const passRoute = {
                                   url: {
                                        url: `/users/pass/${pass._id}`, reservedPlaces: quantity
                                   }, action: generateTicket
                              };
                              navigate(e, passRoute);
                         });
                    } else {
                         
                         eventsSection.innerHTML = `<h3>Actualmente no hay entradas disponibles para este evento</h3> `;

                            const eventsRoute = { action: eventsPage, url: '/events' }

                         const button = await actionButton('volver', eventsRoute, eventsSection);

                          button.style.backgroundColor ='red'

                       
                          
                    } 
               } catch (error) {
                    console.error(`Error al procesar el pase: ${pass?.name}`, error);
               }
          }
     } catch (error) {
          console.error("Error en renderPasesPage:", error);
          eventsSection.innerHTML = "<p>Ocurrió un error al cargar los abonos.</p>";
     }
};