
import { navigate } from '../utils/logic/navigate';
import { userRoutes } from '../utils/routes/routes';
import './itemDetails.css'

export const renderItemDetails = async (e, route, returnRoute, ...rest) => {
     
   
     const { data, keyMapEvent, titleContainer, dataContainer, item, routeAction, text } = returnRoute

     const routes = { ...routeAction, returnRoute };
     
     const fileName = item.image.split('/').pop().replace(/\.\w+$/, '');

     titleContainer.innerHTML = `
        <div class="flex-container select-title">
          <div class="miniature-img">
            <img src="${item.image}" alt='${item.name} imagen'  style="view-transition-name:${fileName}-${item._id}">
          </div>
          <h3>${item.name}</h3>
        </div>
      `;
     
     const contentContainer = itemDetails(data, keyMapEvent);
     dataContainer.classList.add('info-content')
     dataContainer.innerHTML = ""; 
     dataContainer.appendChild(contentContainer);
     
     const actionContainer = document.createElement('div');
     actionContainer.classList.add('flex-container', 'action-container');
     dataContainer.appendChild(actionContainer);
     await actionButton(text, routes, actionContainer,...rest);
     const returnButton = document.querySelector('.button-volver');
     
     if (!returnButton) {
          
          await actionButton('Volver', userRoutes[1], actionContainer);
     }
    
     
     return actionContainer;

}


export const itemDetails = (data, keyMapEvent) => {
   
     const contentContainer = document.createElement('div');
     contentContainer.classList.add('select-card');

     for (const key in keyMapEvent) {
          const { icon } = keyMapEvent[key];
          const value = data[key];

          if (value !== undefined) {
               const row = document.createElement('div');
               row.classList.add('icon-row', 'flex-container');
               row.innerHTML = `<i class="bi ${icon}"></i><span>${value}</span>`;
               contentContainer.appendChild(row);
          }
     }

     // Añadimos el mapa si hay datos de ubicacion
     const map = createEventMap(data);
     if (map) contentContainer.appendChild(map);

     return contentContainer; 
};

export const actionButton = async (text, routeAction, container, icon = null) => {

     const button = document.createElement('button');
     if (!icon || icon === null) {
          
          button.textContent = text;

     } else {

          button.innerHTML = `<span><i class="bi ${icon}"></i></span>`;
     }
    
     button.classList.add(`button-${text.toLowerCase()}`, 'button-action');
     container.appendChild(button);

     button.addEventListener('click', async (e) => {

          navigate(e, routeAction);
        
     });

     return button;

};

export function createEventMap(data) {
     const { location, address, city } = data;

     // Si no hay datos de dirección, no devolvemos nada
     if (!address && !city && !location) return null;

     // Construimos la dirección completa
     const fullAddress = [address, city, location].filter(Boolean).join(', ');

     const mapContainer = document.createElement('div');
     mapContainer.classList.add('event-map' , 'flex-container');

     // Mapa embebido
     const mapIframe = document.createElement('iframe');
     mapIframe.width = "100%";
     mapIframe.height = "300";
     mapIframe.style.border = "0";
     mapIframe.loading = "lazy";
     mapIframe.referrerPolicy = "no-referrer-when-downgrade";
     mapIframe.src = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

     mapContainer.appendChild(mapIframe);

     // Enlace directo a Google Maps
     const mapsLink = document.createElement('a');
     mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
     mapsLink.target = "_blank";
     mapsLink.rel = "noopener noreferrer";
     mapsLink.textContent = "Ver en Google Maps";
     mapsLink.classList.add('maps-link');

    
     const mapGroupContainer = document.createElement('div');
     mapGroupContainer.classList.add('event-map-mapGroupContainer', 'flex-container');
     mapGroupContainer.appendChild(mapContainer);
     mapGroupContainer.appendChild(mapsLink);

     return mapGroupContainer;
}


