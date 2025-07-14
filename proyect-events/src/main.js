import "../style.css";
import { createFooter } from "./components/footer";
import { createHeader } from "./components/header";
import { renderHomePage } from "./pages/home";
import { getRouteFromRegistry, navigate, registerRoute } from "./utils/logic/navigate";
import { allRoutes, userRoutes } from "./utils/routes/routes";


window.addEventListener('load', function () {
     createHeader();
     renderHomePage();
     createFooter();
     window.scrollTo(0, 0);

    
});



allRoutes.forEach(route => {

     registerRoute(route.url, route);
});


// Escuchar evento de retroceso (popstate)
window.addEventListener('popstate', async (e) => {
     const { url, rest } = e.state || {};

     if (!url) {
          console.log('Sin estado en popstate. Posible carga inicial.');
          return;
     }

     const route = getRouteFromRegistry(url);


     if (!route) {
        
          return await navigate(null, userRoutes[1]);
     }

     await navigate(e, route, ...(rest || []));
});










