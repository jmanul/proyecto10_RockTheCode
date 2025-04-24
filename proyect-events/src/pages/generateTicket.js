import { buildFetchJson } from "../api/buildFetch";
import { cardTicket } from "../components/cardticket";
import "./generateTicket.css"


export const generateTicket = async (e, route) => {

     // Seleccionar el contenedor de eventos
     const eventsSection = document.querySelector('.grid-events');
     eventsSection.style.scrollbarGutter = 'stable both-edges';

     // añadir las entradas del evento y generar los tickets
     const request = await buildFetchJson({ route: route.url, method: 'PUT', bodyData: { reservedPlaces: route.reservedPlaces } });

     await renderTicket(request, eventsSection)
    

};

export const renderTicket = async (request, container) => {
     try {
          // Si no hay tickets salimos
          if (!request.ticket) {
               console.warn("No se encontraron tickets en la solicitud.");
               return container;
          }

          // asegurarse de que siempre sea un array para poder usar cualquier respuesta 
          const tickets = Array.isArray(request.ticket) ? request.ticket : [request.ticket];

          
          container.innerHTML = '';

          // Iterar sobre los tickets y renderizar cada uno
          for (const ticket of tickets) {
               try {
                    const ticketContainer = await cardTicket(request, ticket);
                    if (ticketContainer) {
                         container.appendChild(ticketContainer);
                    } else {
                         console.warn("El ticket no pudo ser renderizado:", ticket);
                    }
               } catch (error) {
                    console.error("Error al renderizar un ticket:", error);
               }
          }

          return container;

     } catch (error) {
          console.error("Error en renderTicket:", error);
          container.innerHTML = "<p>Ocurrió un error al cargar los tickets.</p>";
          return container;
     }
};