
import './cardEvent.css';

export function createEventCard(event) {
    
     const card = document.createElement('div');
     card.classList.add('event-card', 'flex-container');

     const image = document.createElement('img');
     image.src = event.image || 'https://via.placeholder.com/150'; 
     image.alt = event.name;
     image.classList.add('event-image');

     const textContainer = document.createElement('div');
     textContainer.classList.add('text-container');

     const name = document.createElement('h3');
     name.textContent = event.name;
     name.classList.add('event-name');

     const typeContainer = document.createElement('div');
     typeContainer.classList.add('flex-container', 'type-container');
     const type = document.createElement('p');
     type.textContent = (event.type).toUpperCase();
     type.classList.add('event-type');
     const status = document.createElement('span');
     status.textContent = event.eventStatus;
     
     const city = document.createElement('p');
     city.textContent = event.city;
     city.classList.add('event-city');

     const startDate = document.createElement('p');
     startDate.textContent = new Date(event.startDate).toLocaleDateString();
     startDate.classList.add('event-date');

     card.appendChild(image);
     card.appendChild(textContainer);
     textContainer.appendChild(typeContainer);
     typeContainer.append(type, status);
     textContainer.appendChild(name);
     textContainer.appendChild(city);
    textContainer.appendChild(startDate);

     return card;
}