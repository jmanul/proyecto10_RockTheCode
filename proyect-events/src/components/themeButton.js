import "./themeButton.css"
import { darkLightAction } from "../utils/logic/modeDarkLight";


export const createThemeButton = () => {

     const darkLightButton = document.createElement('div');
     darkLightButton.id = 'light-theme-button';
     darkLightButton.classList.add('light-theme-button','flex-container');
     darkLightButton.innerHTML = `    <button id="theme-toggle" class="theme-button, flex-container">
    </button><div class="on-off">`;
     const textTheme = document.createElement('span');
     textTheme.id = 'theme-text';
     textTheme.innerText = 'light';
     textTheme.className = 'flex-container';
     darkLightButton.appendChild(textTheme);

     darkLightAction(darkLightButton, textTheme);
     return darkLightButton;
}