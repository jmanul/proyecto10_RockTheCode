
import { actionButton } from "./itemDetails";
import './cardTicket.css';
import { dateFormat } from "../utils/logic/dateFormat";
import { printTicket } from "../utils/logic/printTicket";


export const cardTicket = async (request, ticket) => {


     const event = request.event;
     const pass = request.pass;

     const passStartDate = new Date(pass.startDatePass);
     const startDateFormatted = dateFormat(passStartDate).date;
     const startTimeFormatted = dateFormat(passStartDate).time;

     // Crear el contenedor del ticket
     const ticketContainer = document.createElement('div');
  ticketContainer.classList.add('select-card', 'flex-container', 'action-container')

     ticketContainer.innerHTML = `<div class="event-ticket select-card">
  <div class="ticket-image-container"  style="background-image: url(${event.image})">
    </div>
  <div class="ticket-info">
    <h3 class="ticket-name">Entrada <span>${pass.namePass}</span> - ${event.name}</h3>
    <p class="ticket-price"> ${pass.passPrice} €</p>
    <div class="ticket-details">
      <p><strong>Fecha:</strong> ${startDateFormatted}</p>
      <p><strong>Hora:</strong> ${startTimeFormatted}</p>
      <p><strong>Lugar:</strong> ${event.location}</p>
      <p> ${event.address}</p>
      <p> ${event.city}</p>
    </div>
  </div>
  <div class="ticket-qr-container flex-container">
    <img src=${ticket.qrCode} 
         alt="Código QR de validación" 
         class="ticket-qr">
           <span>${ticket._id}</span>
  </div>
</div>`
     
     const ticketRoute = {
          url: {
               url: `/tickets/${ticket._id}`, ticket: ticket
          }, action: printTicket
     };
     

  // Crear el botón de acción
  
  const containerButton = document.createElement('div');
  containerButton.classList.add('flex-container', 'container-button');
  ticketContainer.appendChild(containerButton);

  const button = await actionButton('Descargar', ticketRoute, containerButton);
  
     return ticketContainer;

}