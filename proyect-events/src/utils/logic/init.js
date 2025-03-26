import { buildFetchJson } from "../../api/buildFetch";
import { createList } from "../../components/list";
import { createSidebar } from "../../components/sidebar";
import { loginRoutes, userRoutes, adminRoutes } from "../routes/routes";


export const initHomeMenu = async () => {

     const header = document.querySelector('header');
     const menuHeader = document.getElementById('nav-menu-header-web');
     menuHeader.remove();

     const request = await buildFetchJson({ route: "/users/user" });

     let routes = loginRoutes; // Por defecto, si no está autenticado

     if (request.isAuth) {
          if (request.user?.roll === 'user') {
               routes = userRoutes;
          } else if (request.user?.roll === 'administrator') {
               routes = adminRoutes;
          }
     }

        
     const newMenuHeader = createList('menu-header-web', routes);  
     header.append(newMenuHeader);
     createSidebar(routes);

     return request.user || null; 
};



//todo intentar eliminar el elemnto si esxite dentro de la funcion