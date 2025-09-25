
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

     const contentContainer = itemDetails(extendedPass, keyMapPass);

     passContainer.appendChild(contentContainer);

     // Agregar clase adicional si no está disponible
     if (!showActions) {

          passContainer.classList.add('pass-unavailable');

          if (pass.totalReservedPlacesPass == pass.maxCapacityPass) {

               const soldOutPasse = document.createElement('div');
               soldOutPasse.classList.add('flex-container', 'asistent-number');
               soldOutPasse.innerHTML = `<img src="https://res.cloudinary.com/dn6utw1rl/image/upload/v1753813877/default/event-soldOut_xg5nxb.png" alt="soldOut">`;
               passContainer.appendChild(soldOutPasse);
          }


     }

     return passContainer;
};


export const renderPassesPage = async (e, route, routeObject) => {

     const { returnRoute, event } = routeObject;
     const { originRoute } = returnRoute;

     try {
          const validateUserEvent = originRoute.includes('userEventsCreate');
          const passes = await buildFetchJson({ route });
          const gridEvents = document.querySelector('.grid-events');
          const passesContainer = document.createElement('div');
          passesContainer.classList.add('flex-container', 'passes-container');


          if (!gridEvents) {
               throw new Error("No se encontró el contenedor de abonos (.grid-events).");
          }
          gridEvents.classList.remove('info-content')
          gridEvents.innerHTML = '';
          gridEvents.appendChild(passesContainer);

          const notContent = document.createElement('div');
          notContent.innerHTML = `<div class="flex-container not-content image-not-content">
<h4>Actualmente no hay entradas disponibles.</h4>
  <img src="https://res.cloudinary.com/dn6utw1rl/image/upload/v1753817663/default/sad-icon-logo_bbyzbd.png" alt="imagen triste">
</div>`;

          if (!passes || passes.length === 0) {

               passesContainer.appendChild(notContent);

               if (validateUserEvent) {

                    notContent.innerHTML = `<div class="flex-container not-content image-not-content">
<h4>Crea tu primer abono.</h4>
  <img src="https://res.cloudinary.com/dn6utw1rl/image/upload/v1753817663/default/sad-icon-logo_bbyzbd.png" alt="imagen triste">
</div>`;

               }


          }

          const buttonContainer = document.createElement('div');
          buttonContainer.classList.add('flex-container', 'action-container');
          gridEvents.appendChild(buttonContainer);
          const returnButton = await actionButton('Volver', returnRoute, gridEvents);
          buttonContainer.appendChild(returnButton)

          let hasAvailablePasses = false;
          const nowDate = new Date();

          for (const pass of passes) {

               try {
                    let maxCapacity = pass.maxCapacityPass;
                    let totalReservedPlaces = pass.totalReservedPlacesPass;
                    const addpassesContainer = document.createElement('div');
                    addpassesContainer.classList.add('flex-container', 'add-passes-container');
                    const passEndDate = new Date(pass.endDatePass);
                    const isPassAvailable = passEndDate > nowDate && totalReservedPlaces < maxCapacity;

                    // Mostrar el pase en cualquier caso, pero con diferente estilo
                    const passCard = createPassCard(
                         pass,
                         isPassAvailable
                    );

                    passesContainer.appendChild(passCard);
                    passCard.appendChild(addpassesContainer);

                    // Configurar acciones de editar el abono si se consulta desde edicion por el autor

                    if (validateUserEvent) {

                         const passUpdateRoute = {
                              url: `/passes/${pass._id}`,
                              action: updatePass,
                              passesRoute: routeObject,
                              pass,
                              event,
                              container: gridEvents,
                              title: `Editar abono ${pass.namePass} de ${event.name}`,
                              description: `Pagina para modificar datos del abono${pass.namPass} del evento ${event.name}`

                         };

                         const asistentNumber = document.createElement('div');
                         asistentNumber.classList.add('flex-container', 'asistent-number-pass');
                         asistentNumber.innerHTML = `<div class= "flex-container"><span><i class="bi bi-people-fill"></i>${totalReservedPlaces} asistentes de ${maxCapacity}</span></div>`;

                         const passContent = passCard.querySelector('.select-card');

                         passContent.appendChild(asistentNumber);


                         await actionButton('Editar', passUpdateRoute, addpassesContainer);

                    }

                    // Configurar acciones de añadir entradas solo si el abono está disponible y no se consulta desde edicion por el autor

                    if (isPassAvailable && !validateUserEvent) {

                         addpassesContainer.innerHTML = `
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
                                   action: generateTicket,
                                   title: `entradas del abono ${pass.namePass} de ${event.name}`,
                                   description: `Oferta de abonos de ${event.name}`
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

               gridEvents.prepend(notContent);
               notContent.innerHTML = `<div class="flex-container not-content">
<h4>Actualmente no hay entradas disponibles.</h4>
</div>`;


          }

     } catch (error) {
          console.error("Error en renderPassesPage:", error);
          const gridEvents = document.querySelector('.grid-events');
          if (gridEvents) {
               gridEvents.innerHTML = `<p>Ocurrió un error al cargar los abonos.</p>`;
               const button = await actionButton('volver', returnRoute, gridEvents);
               button.style.backgroundColor = 'red';
          }
     }
};


export const calculateFreePlaces = (maxCapacity, totalReservedPlaces, reservedPlaces) => {

     const freePlaces = maxCapacity - totalReservedPlaces;

     let totalFreePLaces = freePlaces - reservedPlaces;
     return totalFreePLaces

};