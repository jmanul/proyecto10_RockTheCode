import "./header.css"
import { createList } from "./list";
import { createThemeButton } from "./themeButton";
import { createLogo } from "./logo";
import { loginRoutes } from "../utils/routes/routes";

export const createHeader = () => {
     
     const header = document.createElement('header');
     
     header.className = 'flex-container';
     header.id = 'header';
     const logo = createLogo('/assets/propoysal-person.webp');
     header.appendChild(logo);
    
     const menuHeader = createList('menu-header-web', loginRoutes);  
    
     const darkLightButton = createThemeButton();
     header.appendChild(menuHeader);
     header.appendChild(darkLightButton);
     document.body.prepend(header);

};
