import "../style.css";
import { buildFetchJson } from "./api/buildFetch";
import { createFooter } from "./components/footer";
import { createHeader } from "./components/header";
import { renderHomePage } from "./pages/home";
import { userIsAuth } from "./utils/logic/init";
import { getRouteFromRegistry, navigate, registerRoute } from "./utils/logic/navigate";
import { clearPendingRoute, setPendingRoute } from "./utils/routes/routeCache";
import { allRoutes, loginRoutes, userRoutes } from "./utils/routes/routes";


allRoutes.forEach(route => {

     registerRoute(route.url, route);

});


// 2. Detectar rutas dinámicas como /events/:id
function getMatchingDynamicRoute(path) {
     for (const route of allRoutes) {
          if (route.url.includes(':')) {
               const baseRoute = route.url.split('/:')[0];
               if (path.startsWith(baseRoute)) {
                    const id = path.replace(baseRoute + '/', '');
                    return {
                         ...route,
                         url: path
                    };
               }
          }
     }
     return null;
}

window.addEventListener('load', async function () {
       // Paso 1: siempre renderiza header, footer y scroll
     createHeader();
     createFooter();
     window.scrollTo(0, 0);

     // Paso 2: detecta si la URL actual coincide con alguna ruta registrada
     const currentPath = window.location.pathname;

     // Intentar encontrar una ruta exacta
     let route = getRouteFromRegistry(currentPath);

     // 3.2. Si no existe exacta, buscamos si es dinámica
     if (!route) {
          route = getMatchingDynamicRoute(currentPath);
     }

     // 3.3. Si NO está logueado
          
    const user = await renderHomePage();

     if (!user && route) {
          
               // Guardamos la ruta deseada para usarla tras login
              
               setPendingRoute(route);
          
          // Mostramos login
        
          await navigate(null, loginRoutes[0]);
          return
     }

     // Si existe ruta, navega a ella
     if (route) {

       
          await navigate(null, route);
           clearPendingRoute();
     } 
});



// Escuchar evento de retroceso (popstate)
window.addEventListener('popstate', async (e) => {
     const { url, rest } = e.state || {};

     if (!url) {
 
          return;
     }

     const route = getRouteFromRegistry(url);
     
     

     if (!route) {
        
          return await navigate(null, userRoutes[1]);
     }

     await navigate(e, route, ...(rest || []));
});










