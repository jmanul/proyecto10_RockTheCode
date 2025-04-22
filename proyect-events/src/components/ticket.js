import { buildFetchJson } from "../api/buildFetch";
import { dateFormat } from "../utils/logic/dateFormat";
import { printTicket } from "../utils/logic/printTicket";
import { actionButton } from "./itemDetails";
import "./ticket.css"


export const generateTicket = async (e, route) => {

     // Seleccionar el contenedor de eventos
     const eventsSection = document.querySelector('.grid-events');
     eventsSection.style.scrollbarGutter = 'stable both-edges';
     if (!eventsSection) {
          throw new Error("No se encontró el contenedor de eventos (.grid-events).");
     }

     // añadir las entradas del evento
     const request = await buildFetchJson({ route: route.url, method: 'PUT', bodyData: { reservedPlaces: route.reservedPlaces } });
     if (request.ticket) {

          eventsSection.innerHTML = '';

          const tickets = request.ticket;
          const event = request.event;
          const pass = request.pass;

          const passStartDate = new Date(pass.startDatePass);
          const startDateFormatted = dateFormat(passStartDate).date;
          const startTimeFormatted = dateFormat(passStartDate).time;

          for (const ticket of tickets) {

               // Crear el contenedor del pase
               const ticketContainer = document.createElement('div');
               ticketContainer.classList.add('select-card', 'flex-container')
               ticketContainer.innerHTML = `<div class="event-ticket select-card">
  <div class="ticket-image-container"  style="background-image: url(${event.image})">
    </div>
  <div class="ticket-info">
    <h3 class="ticket-name">Entrada ${pass.namePass} - ${event.name}</h3>
    <p class="ticket-price"> ${pass.passPrice} €</p>
    <div class="ticket-details">
      <p><strong>Fecha:</strong> ${startDateFormatted}</p>
      <p><strong>Hora:</strong> ${startTimeFormatted}</p>
      <p><strong>Lugar:</strong> ${event.location}</p>
      <p> ${event.adress}</p>
      <p> ${event.city}</p>
    </div>
  </div>
  <div class="ticket-qr-container">
    <img src=${ticket.qrCode} 
         alt="Código QR de validación" 
         class="ticket-qr">
  </div>
</div>`

               eventsSection.appendChild(ticketContainer);
               // Crear el botón de acción

               const button = await actionButton('Descargar', route, ticketContainer);

               // Configurar la navegación al hacer clic en el botón

               button.addEventListener('click', (e) => {

                    const ticketRoute = {
                         url: {
                              url: `/tickets/${ticket._id}`, ticket: ticket
                         }, action: printTicket
                    };
                    navigate(e, ticketRoute);
               });
          }

     }
    

}