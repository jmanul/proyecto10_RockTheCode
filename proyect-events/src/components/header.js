import "./header.css"
import { createList } from "./list";
import { routes } from '../utils/routes/routes';
import { darkLightAction } from "../utils/logic/modeDarkLight";

export const createHeader = () => {
     
     const header = document.createElement('header');
     header.className = 'flex-container';
     const logoContainer = document.createElement('div');
     logoContainer.classList.add('flex-container', 'logo');
     const logoImage = document.createElement('img');
     logoImage.src = '/assets/events-icon.png'
     header.appendChild(logoContainer);
     logoContainer.appendChild(logoImage);
     const menuHeader = createList('menu-header-web', routes);
     const darkLightButton = document.createElement('div');
     darkLightButton.id = 'light-theme-button';
     darkLightButton.className = 'light-theme-button';
     darkLightButton.innerHTML = `    <button id="theme-toggle" class="theme-button">
    </button><div class="on-off">`;
     const textTheme = document.createElement('span');
     textTheme.id = 'theme-text';
     textTheme.innerText = 'light';
     darkLightButton.appendChild(textTheme);
     
     darkLightAction(darkLightButton, textTheme );

     header.appendChild(menuHeader);
     header.appendChild(darkLightButton);
     document.body.appendChild(header);

};