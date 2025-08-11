import { eventsPage } from "./events"


export const oneEventPage = async(e, route, routeObject) => {  
     await eventsPage(e, route);
     const textEventContainer = document.querySelector('.text-events');
     textEventContainer.innerHTML = `<h2>Evento Recomendado</h2>`;
     
     
     }
     


