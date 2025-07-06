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

   if (route.transitionClass) {
          document.documentElement.classList.add(route.transitionClass);
     }

     const render = () =>
          typeof route.action === 'function'
               ? route.action(e, route.url, ...(rest || []), route)
               : console.log('No hay función action para esta ruta:', route);

     if (document.startViewTransition) {
          document.startViewTransition(render).finished.then(() =>
               clearTransitions()
          );
     } else {
          await render();
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


