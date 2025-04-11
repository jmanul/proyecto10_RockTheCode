
import { navigate } from '../utils/logic/navigate';
import './itemDetails.css'
export const renderItemDetails = async (data, keyMapEvent, titleContainer, dataContainer, item, route, text) => {

     titleContainer.innerHTML = `
        <div class="flex-container select-title">
          <div class="miniature-img">
            <img src="${item.image}" alt='${item.name} imagen'>
          </div>
          <h3>${item.name}</h3>
        </div>
      `;

     dataContainer.innerHTML =  itemDetails(data, keyMapEvent);
    const button = await actionButton(text, route, dataContainer);
     
     return button;

}


export const itemDetails = (data, keyMapEvent) => {

     let html = `<div class="select-card">`;

     for (const key in keyMapEvent) {
          const { icon } = keyMapEvent[key];
          const value = data[key];

          if (value !== undefined) {
               html += `
        <div class="icon-row">
          <i class="bi ${icon}"></i>
          <span>${value}</span>
        </div>`;
          }
     }

     html += `</div>`;


     return html;
};

export const actionButton = async (text, route, container) => {

     const button = document.createElement('button');
     button.textContent = text;
     container.appendChild(button);

     button.addEventListener('click', async (e) => {

          navigate(e, route);
        
         
     });

     return button;

}