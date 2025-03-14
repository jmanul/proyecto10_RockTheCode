
import './cardEvent.css';

export function createEventCard(event) {
     // Crear el contenedor de la tarjeta
     const card = document.createElement('div');
     card.classList.add('event-card', 'flex-container');

     // Crear la imagen del evento
     const image = document.createElement('img');
     image.src = event.image || 'https://via.placeholder.com/150'; // Placeholder si no hay imagen
     image.alt = event.name;
     image.classList.add('event-image');

     // Crear el contenedor del texto
     const textContainer = document.createElement('div');
     textContainer.classList.add('text-container');

     // Crear el título del evento
     const name = document.createElement('h3');
     name.textContent = event.name;
     name.classList.add('event-name');

     // Crear el tipo de evento
     const typeContainer = document.createElement('div');
     typeContainer.classList.add('flex-container', 'type-container');
     const type = document.createElement('p');
     type.textContent = (event.type).toUpperCase();
     type.classList.add('event-type');
     const status = document.createElement('span');
     status.textContent = event.eventStatus
     
     // Crear la ciudad del evento
     const city = document.createElement('p');
     city.textContent = event.city;
     city.classList.add('event-city');

     // Crear la fecha de inicio del evento
     const startDate = document.createElement('p');
     startDate.textContent = new Date(event.startDate).toLocaleDateString();
     startDate.classList.add('event-date');

     // Añadir elementos al contenedor de la tarjeta
     card.appendChild(image);
     card.appendChild(textContainer);
     textContainer.appendChild(typeContainer);
     typeContainer.append(type, status);
     textContainer.appendChild(name);
     textContainer.appendChild(city);
    textContainer.appendChild(startDate);

     return card;
}