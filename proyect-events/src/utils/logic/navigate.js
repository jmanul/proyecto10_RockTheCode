
export const navigate = (e, route, ...rest) => {
    
     e.preventDefault();
      
     window.history.pushState({}, "", route.url);

     if (route.action) {

          // añado rest y route como opcion para las funciones que necesiten otros params

          route.action(e, route.url, ...(rest || []), route);
     }

};


