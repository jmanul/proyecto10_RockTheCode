

const PENDING_ROUTE_KEY = 'pendingRoute';

export const setPendingRoute = (route) => {
     try {
          // Solo guardamos url y action name para poder reconstruir
          const routeData = {
               url: route.url,
               actionName: route.action?.name || null
          };
          sessionStorage.setItem(PENDING_ROUTE_KEY, JSON.stringify(routeData));
     } catch (e) {
          console.warn('No se pudo guardar la ruta pendiente:', e);
     }
}

export const getPendingRoute = () => {
     try {
          const data = sessionStorage.getItem(PENDING_ROUTE_KEY);
          if (!data) return null;
          return JSON.parse(data);
     } catch (e) {
          console.warn('No se pudo recuperar la ruta pendiente:', e);
          return null;
     }
}

export const clearPendingRoute = () => {
     try {
          sessionStorage.removeItem(PENDING_ROUTE_KEY);
     } catch (e) {
          console.warn('No se pudo limpiar la ruta pendiente:', e);
     }
}