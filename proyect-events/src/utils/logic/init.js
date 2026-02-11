import { buildFetchJson } from "../../api/buildFetch";
import { createList } from "../../components/list";
import { createSidebar } from "../../components/sidebar";
import { loginRoutes, userRoutes, adminRoutes} from "../routes/routes";


export const initHomeMenu = async () => {


     const header = document.querySelector('header');
     const menuHeader = document.getElementById('nav-menu-header-web');
     
     // Preservar el botón de tema antes de borrar el nav
     const themeBtn = document.getElementById('theme-button-global');
     
     if (menuHeader) {
          menuHeader.remove();
     }

     let request = null;
     try {
          request = await userIsAuth();
     } catch (err) {
          console.warn('No se pudo verificar autenticación:', err.message);
     }

     let routes = loginRoutes; // Por defecto, si no está autenticado

     if (request && request.isAuth) {
          if (request.user?.roll === 'user') {
               routes = userRoutes;
          } else if (request.user?.roll === 'administrator') {
               routes = adminRoutes;
          }
     }
        
     const newMenuHeader = createList('menu-header-web', routes);  
     header.append(newMenuHeader);
     
     // Reinsertar el botón de tema en el nuevo nav si estamos en tablet/móvil
     if (themeBtn) {
          if (window.innerWidth <= 1024) {
               newMenuHeader.appendChild(themeBtn);
          } else {
               const hBtn = document.getElementById('hamburger-btn');
               if (hBtn) {
                    header.insertBefore(themeBtn, hBtn);
               } else {
                    header.appendChild(themeBtn);
               }
          }
     }
     
     createSidebar(routes);

     return request?.user || null; 
};


export const userIsAuth = async () => {


     const requestAuthUser = await buildFetchJson({ route: "/users/user" });
     
     return requestAuthUser;

}



