
import { navigate } from '../utils/logic/navigate';
import './itemDetails.css'
export const renderItemDetails = async (data, keyMapEvent, titleContainer, dataContainer, item, route , text,...rest) => {

     titleContainer.innerHTML = `
        <div class="flex-container select-title">
          <div class="miniature-img">
            <img src="${item.image}" alt='${item.name} imagen'>
          </div>
          <h3>${item.name}</h3>
        </div>
      `;

     dataContainer.innerHTML = itemDetails(data, keyMapEvent);
     
     const actionContainer = document.createElement('div');
     actionContainer.classList.add('flex-container', 'action-container');
     dataContainer.appendChild(actionContainer);
     await actionButton(text, route, actionContainer,...rest);
     
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

export const actionButton = async (text, route, container, icon = null) => {

     const button = document.createElement('button');
     if (!icon || icon === null) {
          
          button.textContent = text;

     } else {

          button.innerHTML = `<span><i class="bi ${icon}"></i></span>`;
     }
    
     button.classList.add(`button-${text}`);
     container.appendChild(button);

     button.addEventListener('click', async (e) => {

          navigate(e, route);
        
         
     });

     return button;

}