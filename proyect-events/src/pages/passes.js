
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



// Función para crear la tarjeta de un pase 
export const createPassCard = (pass, showActions = true) => {
     const passEndDate = new Date(pass.endDatePass);
     const passStartDate = new Date(pass.startDatePass);

     const extendedPass = {
          ...pass,
          startDateFormatted: dateFormat(passStartDate).date,
          startTimeFormatted: dateFormat(passStartDate).time,
          endDateFormatted: dateFormat(passEndDate).date
     };

     // Crear contenedor principal del pase
     const passContainer = document.createElement('div');
     passContainer.classList.add('select-card', 'flex-container');
     //todo: haceer distintos estilos para vendido o caducado ------------------------------->
     // Agregar clase adicional si no está disponible
     if (!showActions) {
          passContainer.classList.add('pass-unavailable');
     }

     passContainer.innerHTML = itemDetails(extendedPass, keyMapPass);


     return passContainer;
};


export const renderPassesPage = async (e, route, routeObject) => {
     try {
          const validateUserEvent = routeObject.return.url.includes('userEventsCreate');
          const passes = await buildFetchJson({ route });
          const eventsSection = document.querySelector('.grid-events');

          if (!eventsSection) {
               throw new Error("No se encontró el contenedor de eventos (.grid-events).");
          }

          eventsSection.innerHTML = '';

          const returnButton = await actionButton('Volver', routeObject.return, eventsSection);
          const notContent = document.createElement('p');
          notContent.innerText = 'Actualmente no hay entradas disponibles';
          notContent.classList.add('flex-container', 'not-content');

          if (!passes || passes.length === 0) {
               eventsSection.prepend(notContent);

          }

          let hasAvailablePasses = false;
          const nowDate = new Date();

          for (const pass of passes) {
               try {
                    const passEndDate = new Date(pass.endDatePass);
                    const isPassAvailable = passEndDate > nowDate &&
                         pass.totalReservedPlacesPass < pass.maxCapacityPass;

                    // Mostrar el pase en cualquier caso, pero con diferente estilo
                    const passCard = createPassCard(
                         pass,
                         isPassAvailable 
                    );

                    eventsSection.prepend(passCard);

                    // Configurar acciones solo si el pase está disponible y no se consulta en edicion

                    //todo: if validateUserEvent añadir accion de modificar entrada------------------------------->
                    if (isPassAvailable && !validateUserEvent) {

                         const addPassesContainer = document.createElement('div');
                         addPassesContainer.classList.add('flex-container', 'add-passes-container');
                         addPassesContainer.innerHTML = `
            <div class="flex-container quantity-group">
                <input 
                    id="quantity-ticket-${pass._id}"
                    inputmode="numeric"                   
                    type="number" 
                    min="1" 
                    max="5" 
                    value="0"
                    class="number-tickets"
                    required
                >
                <span class="error-message">
                    El valor debe estar entre 1 y 5
                </span>
            </div>`;

                         passCard.appendChild(addPassesContainer);

                         const quantityInput = passCard.querySelector('.number-tickets');
                         const errorMessage = passCard.querySelector('.error-message');

                         const button = await actionButton('Añadir', route, addPassesContainer);

                         button.addEventListener('click', (e) => {
                              const quantity = parseInt(quantityInput.value);
                              if (quantity < 1 || quantity > 5) {
                                   errorMessage.style.display = "block";
                                   return;
                              }
                              errorMessage.style.display = 'none';
                              const passRoute = {
                                   url: {
                                        url: `/users/pass/${pass._id}`,
                                        reservedPlaces: quantity
                                   },
                                   action: generateTicket
                              };
                              navigate(e, passRoute);
                         });
                    }

                    if (isPassAvailable) {
                         hasAvailablePasses = true;
                    }

               } catch (error) {
                    console.error(`Error al procesar el pase: ${pass?.name}`, error);
               }
          }

          if (!hasAvailablePasses && !validateUserEvent) {

               eventsSection.prepend(notContent);

          }

     } catch (error) {
          console.error("Error en renderPassesPage:", error);
          const eventsSection = document.querySelector('.grid-events');
          if (eventsSection) {
               eventsSection.innerHTML = `<p>Ocurrió un error al cargar los abonos.</p>`;
               const button = await actionButton('volver', userRoutes[1], eventsSection);
               button.style.backgroundColor = 'red';
          }
     }
};