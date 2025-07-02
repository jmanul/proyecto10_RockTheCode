

export const navigate = async (e, route, ...rest) => {
    
     e.preventDefault();
      
     window.history.pushState({}, "", route.url);

     if (route.action) {

          // añado rest y route como opcion para las funciones que necesiten otros params
          
          if (document.startViewTransition) {
               document.startViewTransition(() => {
                    // Se ejecuta el cambio de vista con animación
                    return route.action(e, route.url, ...(rest || []), route);
               });
          } else {
               // Fallback si el navegador no soporta View Transitions
               await route.action(e, route.url, ...(rest || []), route);
          }
     }

};


