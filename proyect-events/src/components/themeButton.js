import "./themeButton.css"
import { darkLightAction } from "../utils/logic/modeDarkLight";


export const createThemeButton = () => {

     const darkLightButton = document.createElement('div');
     darkLightButton.id = 'light-theme-button';
     darkLightButton.className = 'light-theme-button';
     darkLightButton.innerHTML = `    <button id="theme-toggle" class="theme-button">
    </button><div class="on-off">`;
     const textTheme = document.createElement('span');
     textTheme.id = 'theme-text';
     textTheme.innerText = 'light';
     darkLightButton.appendChild(textTheme);

     darkLightAction(darkLightButton, textTheme);
     return darkLightButton;
}