import "../style.css";
import { createFooter } from "./components/footer";
import { createHeader } from "./components/header";
import { renderHomePage } from "./pages/home";
import { renderNotFoundPage } from "./pages/notFound";
import { getRouteFromRegistry, navigate, registerRoute } from "./utils/logic/navigate";
import { clearPendingRoute, setPendingRoute } from "./utils/routes/routeCache";
import { allRoutes, loginRoutes, userRoutes, notFoundRoute } from "./utils/routes/routes";
import { initHomeMenu } from "./utils/logic/init";


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

// Función principal de inicialización
const initApp = async () => {
     try {
          // Paso 1: siempre renderiza header, footer y scroll
          createHeader();
          createFooter();
          window.scrollTo(0, 0);

          // Paso 2: detecta si la URL actual coincide con alguna ruta registrada
          const currentPath = window.location.pathname;

          // Intentar encontrar una ruta exacta
          let route = getRouteFromRegistry(currentPath);

          // Si no existe exacta, buscamos si es dinámica
          if (!route) {
               route = getMatchingDynamicRoute(currentPath);
          }

          // Paso 3: Verificar autenticación (sin renderizar home todavía)
          let user = null;
          
          // Si no hay ruta específica o es home, renderizar home completo
          if (!route || currentPath === '/' || currentPath === '/home') {
               user = await renderHomePage();
          } else {
               // Hay una ruta específica, solo inicializar menú
               user = await initHomeMenu();
          }

          // Paso 4: Si NO está logueado y hay una ruta específica
          if (!user && route) {
               // Guardamos la ruta deseada para usarla tras login
               setPendingRoute(route);
               // Mostramos login
               await navigate(null, loginRoutes[0]);
               return;
          }

          // Paso 5: Si está logueado y existe ruta específica, navegar a ella
          if (route) {
               // Limpiar ruta pendiente antes de navegar
               clearPendingRoute();
               await navigate(null, route);
          } else if (user && currentPath !== '/' && currentPath !== '/home') {
               // Paso 6: Si está logueado pero la ruta no existe, mostrar 404
               await navigate(null, notFoundRoute);
          }
     } catch (error) {
          console.error('💥 ERROR CRÍTICO EN INIT:', error);
          document.body.innerHTML = `<div style="color: red; padding: 20px;">
               <h1>Error al cargar la aplicación</h1>
               <p>${error.message}</p>
               <pre>${error.stack}</pre>
          </div>`;
     }
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
     document.addEventListener('DOMContentLoaded', initApp);
} else {
     // El DOM ya está cargado, ejecutar inmediatamente
     initApp();
}



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










