import "./sidebar.css"
import { createList } from "./list";

export const createSidebar = (routes) => {
    
     const menuLateral = createList('menu-lateral', routes);
     const app = document.getElementById('app');
     app.appendChild(menuLateral);
 
     
};