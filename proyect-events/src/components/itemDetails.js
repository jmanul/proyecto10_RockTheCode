
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
     

     dataContainer.innerHTML = itemDetails(data, keyMapEvent);
     
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

     let html = `<div class="select-card">`;

     for (const key in keyMapEvent) {
          const { icon } = keyMapEvent[key];
          const value = data[key];

          if (value !== undefined) {
               html += `
        <div class="icon-row flex-container">
          <i class="bi ${icon}"></i>
          <span>${value}</span>
        </div>`;
          }
     }

     html += `</div>`;


     return html;
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
        
         console.log(routeAction, 'routeaction');
     });

     return button;

}