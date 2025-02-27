import './home.css';


export function renderHomePage(container) {
     container.innerHTML = '';

     const title = document.createElement('h1');
     title.textContent = 'Eventos Disponibles';
     container.appendChild(title);

     const eventsList = document.createElement('ul');
     eventsList.classList.add('events-list');
     container.appendChild(eventsList);

     // api.get('/api/events')
     //      .then((data) => {
     //           data.events.forEach((event) => {
     //                const listItem = document.createElement('li');
     //                listItem.textContent = event.name;
     //                eventsList.appendChild(listItem);
     //           });
     //      })
     //      .catch((error) => {
     //           console.error('Error al cargar eventos:', error);
     //      });
}