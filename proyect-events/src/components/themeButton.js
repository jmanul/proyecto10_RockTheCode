import "./themeButton.css"
import { darkLightAction } from "../utils/logic/modeDarkLight";


export const createThemeButton = () => {

     const darkLightButton = document.createElement('div');
     darkLightButton.id = 'dark-theme-button';
     darkLightButton.classList.add('dark-theme-button','flex-container');
     darkLightButton.innerHTML = `    <button id="theme-toggle" class="theme-button, flex-container">
    </button><div class="on-off">`;
     const textTheme = document.createElement('span');
     textTheme.id = 'theme-text';
     textTheme.innerText = 'dark';
     textTheme.className = 'flex-container';
     darkLightButton.appendChild(textTheme);

     darkLightAction(darkLightButton, textTheme);
     return darkLightButton;
}