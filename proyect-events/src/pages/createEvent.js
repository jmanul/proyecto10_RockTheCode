import './createEvent.css';
import { createForm } from '../components/form.js';
import { actionRequest } from '../utils/logic/actionRequest.js';
import { createEventCard } from '../components/cardEvent.js';


const eventFields = [

     { name: 'name', type: 'text', placeholder: 'Nombre del evento', required: true },
     {
          name: 'type',
          type: 'select',
          placeholder: 'Tipo de evento',
          required: false,
          options: [
               'musica',
               'deporte',
               'fiesta',
               'formación',
               'arte',
               'gastronomía',
               'tecnología',
               'otros'
          ]
     },
     { name: 'location', type: 'text', placeholder: 'Lugar', required: true },
     { name: 'adress', type: 'text', placeholder: 'Dirección', required: true },
     { name: 'city', type: 'text', placeholder: 'Ciudad', required: true },
     { name: 'description', type: 'textarea', placeholder: 'Descripción', required: true },
     { name: 'startDate', type: 'datetime-local', placeholder: 'Fecha de inicio', required: true },
     { name: 'endDate', type: 'datetime-local', placeholder: 'Fecha de fin', required: false },
     // {
     //      name: 'eventStatus',
     //      type: 'select',
     //      placeholder: 'Estado del evento',
     //      required: false,
     //      options: [
     //           'not-start',
     //           'postponed',
     //           'cancelled',
     //           'finalized'
     //      ]
     // },
     { name: 'image', type: 'file', placeholder: 'Imagen del evento', required: false },
     { name: 'maxCapacity', type: 'number', placeholder: 'Capacidad máxima', required: true }
];

const appContainer = document.getElementById('app');

export const NewEventPage = async () => {


     // Seleccionar el contenedor de eventos
     const eventsSection = document.querySelector('.grid-events');
     eventsSection.style.scrollbarGutter = 'stable both-edges';
     if (!eventsSection) {
          throw new Error("No se encontró el contenedor de eventos (.grid-events).");
     }

     const textEvents = document.querySelector('.text-events');

     if (!textEvents) {
          throw new Error("No se encontró el contenedor de texto (.text-events).");
     }

     textEvents.innerHTML = `<h2> Tus Eventos </h2>`;
     eventsSection.innerHTML = '';

    

       // Obtener los datos de los eventos
     const userEvents = await buildFetchJson({ route });
               const events = request?.events;
     
               // Validar si hay eventos disponibles
               if (!events || events.length === 0) {
                    eventsSection.innerHTML = "<p>No hay resultados disponibles.</p>";
                    return;
               }
}

export const createEvent = async (e, route) => {

     try {

          // Seleccionar el contenedor de eventos
          const formNewEventContainer = document.querySelector('.div-passes');
          // formNewEventContainer.style.scrollbarGutter = 'stable both-edges';
          if (!formNewEventContainer) {
               throw new Error("No se encontró el contenedor de eventos (.grid-events).");
          }

          const textNewEvents = document.querySelector('.text-passes');

          if (!textNewEvents) {
               throw new Error("No se encontró el contenedor de texto (.text-events).");
          }

          textNewEvents.innerHTML = `<h2> Nuevo evento </h2>`;
          formNewEventContainer.innerHTML = '';
         


          // Crear el formulario para la creación de un nuevo evento
          const formNewEvent = await createForm(eventFields, 'Crear');
          
            if (!formNewEvent) {
                         throw new Error("No se pudo crear el formulario para el nuevo evento");
                    }
          
                    // Añadir el formulario al contenedor
                    formNewEventContainer.appendChild(formNewEvent);
          
          await actionRequest(formNewEvent, '/events/', 'POST', NewEventPage, appContainer);
          
    
     } catch (error) {
          console.error("Error en renderEvents:", error);
          eventsSection.innerHTML = "<p>Ocurrió un error al cargar los eventos.</p>";
     }



}



