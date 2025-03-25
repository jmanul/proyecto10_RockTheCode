import "./header.css"
import { createList } from "./list";
import { createThemeButton } from "./themeButton";
import { createLogo } from "./logo";

export const createHeader = (routes) => {
     
     const header = document.createElement('header');
     header.className = 'flex-container';
     const logo = createLogo('/assets/propoysal-person.webp');
     header.appendChild(logo);
    
     const menuHeader = createList('menu-header-web', routes);  
    
     const darkLightButton = createThemeButton();
     header.appendChild(menuHeader);
     header.appendChild(darkLightButton);
     document.body.prepend(header);

};



//todo:remove header y footer siempre se deja