import "./sidebar.css"
import { createList } from "./list";
import { routes } from '../utils/routes/routes';

export const createSidebar = () => {

     
     const menuLateral = createList('menu-lateral', routes);

     document.body.appendChild(menuLateral);
 

};