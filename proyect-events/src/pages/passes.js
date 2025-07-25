
import { buildFetchJson } from '../api/buildFetch';
import { actionButton, itemDetails } from '../components/itemDetails';
import { generateTicket } from './generateTicket';
import { dateFormat } from '../utils/logic/dateFormat';
import { navigate } from '../utils/logic/navigate';
import './passes.css'
import { updatePass } from './updatePass';

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

     passContainer.innerHTML = itemDetails(extendedPass, keyMapPass);

     // Agregar clase adicional si no está disponible
     if (!showActions) {

          passContainer.classList.add('pass-unavailable');

          if (pass.totalReservedPlacesPass == pass.maxCapacityPass) {

               const soldOutPasse = document.createElement('div');
               soldOutPasse.classList.add('flex-container', 'asistent-number');
               soldOutPasse.innerHTML = `<img src="/assets/event-soldOut.png" alt="soldOut">`;
               passContainer.appendChild(soldOutPasse);
          }


     }

     return passContainer;
};


export const renderPassesPage = async (e, route, routeObject) => {
    
     const { returnRoute, event } = routeObject;
     const { originRoute } = returnRoute
    
     try {
          const validateUserEvent = originRoute.includes('userEventsCreate');
          const passes = await buildFetchJson({ route });
          const eventsSection = document.querySelector('.grid-events');


          if (!eventsSection) {
               throw new Error("No se encontró el contenedor de eventos (.grid-events).");
          }

          eventsSection.innerHTML = '';

         
          const notContent = document.createElement('h2');
          notContent.innerText = 'Actualmente no hay entradas disponibles';
          notContent.classList.add('flex-container', 'not-content');
          
          const notContentAutorContainer = document.createElement('div');
          notContentAutorContainer.classList.add('image-not-content');
          const notContentAutor = document.createElement('h2');
          notContentAutor.classList.add('flex-container');

          if (!passes || passes.length === 0) {

               eventsSection.prepend(notContent);
               eventsSection.appendChild(notContentAutorContainer)
               notContentAutorContainer.innerHTML = `<div class="flex-container">
  <img src="/assets/saw-events.webp" alt="imagen triste">
</div>`;  
               if (validateUserEvent) {
                    notContentAutorContainer.appendChild(notContentAutor);
                    notContent.innerText = 'Crea el primer abono';  
              
               }
              

          } 

          await actionButton('Volver', returnRoute, eventsSection, 'bi-x-circle-fill');

          let hasAvailablePasses = false;
          const nowDate = new Date();

          for (const pass of passes) {
               try {
                    let maxCapacity = pass.maxCapacityPass;
                    let totalReservedPlaces = pass.totalReservedPlacesPass;

                    const addPassesContainer = document.createElement('div');
                    addPassesContainer.classList.add('flex-container', 'add-passes-container');
                    const passEndDate = new Date(pass.endDatePass);
                    const isPassAvailable = passEndDate > nowDate && totalReservedPlaces < maxCapacity;

                    // Mostrar el pase en cualquier caso, pero con diferente estilo
                    const passCard = createPassCard(
                         pass,
                         isPassAvailable
                    );

                    eventsSection.prepend(passCard);

                    passCard.appendChild(addPassesContainer);

                    // Configurar acciones de editar el abono está si se consulta desde edicion por el autor

                    if (validateUserEvent) {

                         const passUpdateRoute = {
                              url: `/passes/${pass._id}`,
                              action: updatePass,
                              passesRoute: routeObject,
                              pass,
                              event, 
                              container : eventsSection
                              
                         };

                         await actionButton('Editar', passUpdateRoute, addPassesContainer);

                    }

                    // Configurar acciones de añadir entradas solo si el abono está disponible y no se consulta desde edicion por el autor

                    if (isPassAvailable && !validateUserEvent) {

                         addPassesContainer.innerHTML = `
            <div class="flex-container reserved-places-group">
                <input 
                    id="reservedPlaces-ticket-${pass._id}"
                    inputmode="numeric"                   
                    type="number" 
                    min="1" 
                    max="5" 
                    value="0"
                    class="number-tickets"
                    required
                >
                <button type="submit" class="button-añadir button-action">Añadir</button>
                 </div>
                 <div>
                   <span class="error-message">
                    El valor debe estar entre 1 y 5
                </span>
                 </div>`;

                         const reservedPlacesInput = passCard.querySelector('.number-tickets');
                         const errorMessage = passCard.querySelector('.error-message');

                         const addPassButton = document.querySelector('.button-añadir');
                    
                         addPassButton.addEventListener('click', (e) => {
                              const reservedPlaces = parseInt(reservedPlacesInput.value);
                              if (reservedPlaces < 1 || reservedPlaces > 5) {
                                   errorMessage.style.display = "block";
                                   return;
                              }

                              const freePlaces = calculateFreePlaces(maxCapacity, totalReservedPlaces, reservedPlaces);


                              if (freePlaces < 0) {
                                   
                                   errorMessage.textContent = 'no hay entradas suficientes'
                                   errorMessage.style.display = "block";
                                   return;

                              }
                              errorMessage.style.display = 'none';
                              const passRoute = {

                                   url: `/users/pass/${pass._id}`,
                                   reservedPlaces,
                                   action: generateTicket, transitionClass: 'view-transition-form'
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
               const button = await actionButton('volver', returnRoute, eventsSection);
               button.style.backgroundColor = 'red';
          }
     }
};


export const calculateFreePlaces = (maxCapacity, totalReservedPlaces, reservedPlaces) => {

     const freePlaces = maxCapacity - totalReservedPlaces;

     let totalFreePLaces = freePlaces - reservedPlaces;
     return totalFreePLaces

};