import "./sidebar.css"
import { createList } from "./list";

export const createSidebar = (routes) => {
    
     const menuLateral = createList('menu-lateral', routes);

     document.body.appendChild(menuLateral);
 

};