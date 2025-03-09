
import { createList } from "./list";
import { routes } from '../utils/routes/routes';

export const createHeader = () => {
     
     const header = document.createElement('header');
     const menuHeader = createList('menu-header', routes);

     header.appendChild(menuHeader);
     document.body.appendChild(header);

};