
import './cardEvent.css';
import { createMessage } from './message';

export function createEventsCard(event) {
     
     const card = document.createElement('div');
     card.classList.add('event-card', 'flex-container');
     card.style.setProperty('--bg-url', `url(${event.image})`);

     const image = document.createElement('img');
     image.src = event.image; 
     image.alt = event.name;
     image.classList.add('event-image');

     const textContainer = document.createElement('div');
     textContainer.classList.add('text-container', 'flex-container');

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
     event.eventStatus === 'not-start' ? status.className = 'not-start' : status.className = '';  
     
     const city = document.createElement('p');
     city.textContent = event.city;
     city.classList.add('event-city');

     const startDate = document.createElement('p');
     startDate.textContent = new Date(event.startDate).toLocaleDateString();
     startDate.classList.add('event-date');

     const asistentNumber = document.createElement('div');
     asistentNumber.classList.add('flex-container', 'asistent-number');

     if (event.maxCapacity > 0 && event.totalReservedPlaces === event.maxCapacity) {
  
          asistentNumber.innerHTML = `<img src="https://res.cloudinary.com/dn6utw1rl/image/upload/v1753813877/default/event-soldOut_xg5nxb.png" alt="soldOut">`;
     }

     const shareButton = document.createElement('div');
     shareButton.classList.add('share-btn');
     const shareIcon = document.createElement('img');
     shareIcon.src = '/assets/share.svg'; 
     shareIcon.alt = 'Compartir';
     shareButton.title = "Compartir este evento";
     shareIcon.classList.add('share-icon');
     shareButton.appendChild(shareIcon);

     //URL a compartir usando la ruta dinámica
     const shareUrl = `${window.location.origin}/events/${event._id}`;

     shareButton.addEventListener('click', async (e) => {
          
          // evita el listener del padre al hacer click sobre el icono
          e.stopPropagation();

          if (navigator.share) {
               try {
                    await navigator.share({
                         title: event.name,
                         text: 'Te comparto este evento',
                         url: shareUrl
                    });
               } catch (err) {
                    console.error('Error al compartir:', err);
                    createMessage('Error al compartir');
               }
          } else {
               try {
                    await navigator.clipboard.writeText(shareUrl);
                    createMessage('Enlace copiado al portapapeles');

               } catch (err) {
                    console.error('No se pudo copiar el enlace', err);
                    createMessage('No se pudo copiar el enlace');
               }
          }
     });


     card.appendChild(image);
     card.appendChild(asistentNumber);
     card.appendChild(textContainer);
     textContainer.appendChild(typeContainer);
     typeContainer.append(type, status);
     textContainer.appendChild(name);
     textContainer.appendChild(city);
     textContainer.appendChild(startDate);
     card.appendChild(shareButton);

   

     return card;
}