import "./header.css"
import { createList } from "./list";
import { routes } from '../utils/routes/routes';
import { createThemeButton } from "./themeButton";
import { createLogo } from "./logo";

export const createHeader = () => {
     
     const header = document.createElement('header');
     header.className = 'flex-container';
     const logo = createLogo();
     header.appendChild(logo);
    
     const menuHeader = createList('menu-header-web', routes);  
    
     const darkLightButton = createThemeButton();
     header.appendChild(menuHeader);
     header.appendChild(darkLightButton);
     document.body.appendChild(header);

};
