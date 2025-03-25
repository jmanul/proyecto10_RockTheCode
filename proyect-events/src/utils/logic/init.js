import { buildFetchJson } from "../../api/buildFetch";
import { createHeader } from "../../components/header";
import { createSidebar } from "../../components/sidebar";
import { loginRoutes, userRoutes, adminRoutes } from "../routes/routes";


export const initHomeMenu = async () => {
      
       const request = await buildFetchJson({ route: "/users/user" });
     
     if (!request || request.isAuth === false) {
          
          createHeader(loginRoutes);
          createSidebar(loginRoutes);
       
          return;

     };

     if (request.isAuth === true && request.user.roll === 'user') {
          
          createHeader(userRoutes);
          createSidebar(userRoutes);


     } else if (request.isAuth === true && request.user.roll === 'administrator'){

          createHeader(adminRoutes);
          createSidebar(adminRoutes);
     };

     return request.user;

}


//todo intentar eliminar el elemnto si esxite dentro de la funcion