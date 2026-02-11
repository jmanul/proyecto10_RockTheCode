import { clearPendingRoute } from "../routes/routeCache";

// Mapa de rutas registradas en memoria
const routeRegistry = new Map();

// Registrar una ruta
export const registerRoute = (url, route) => {
     routeRegistry.set(url, route);
};

// Obtener ruta por URL
export const getRouteFromRegistry = (url) => {
     return routeRegistry.get(url);
};

export const navigate = async (e, route, ...rest) => {
   
     if (e) e.preventDefault();
     if (!route || !route.url) {
          console.error('Error: ruta inválida', route);
          return;
     }

     // Limpiar ruta pendiente cuando el usuario navega manualmente
     // (excepto cuando es una navegación a login para guardar la ruta pendiente)
     if (!route.url.includes('/login') && !route.url.includes('/register')) {
          clearPendingRoute();
     }

     const fullRoute = { ...route, rest };

     const isPop = e && e?.type === 'popstate';
     const formRoute = route.transitionClass === 'view-transition-form';
     
     if (!isPop && !formRoute) {
          registerRoute(route.url, fullRoute);
          history.pushState({ url: route.url }, '', route.url);
     } else if (route.replace) {
          history.replaceState({ url: route.url }, '', route.url);
     }

     clearTransitions();

     //añade un efecto por defecto si no lo tiene ya

     if (!route.transitionClass) {
          document.documentElement.classList.add('view-transition-opacity');
     } else {
          // Aplica la transición que venga en la ruta
          document.documentElement.classList.add(route.transitionClass);
     }
     
     // SEO dinámico
     if (route.title) {
          document.title = route.title;
     }

     if (route.description) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
               metaDesc = document.createElement('meta');
               metaDesc.name = "description";
               document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute("content", route.description);
     }

     const render = () => { 

          if (typeof route.action === 'function') {
               
               route.action(e, route.url, route, ...(rest || []))
          }
    
     };
        

     if (document.startViewTransition) {
          document.startViewTransition(render).finished.then(() =>
               clearTransitions()
          );
     } else {
          render();
          clearTransitions();
     }
};

export const clearTransitions = () => {

     window.scrollTo(0, 0); 
     [...document.documentElement.classList].forEach(cls => {
          if (cls.startsWith('view-transition-')) {
               document.documentElement.classList.remove(cls);
          }
     });
};


