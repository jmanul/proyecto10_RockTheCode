
export const navigate = (e, route) => {
    
     e.preventDefault();
      
     window.history.pushState({}, "", route.url);

     if (route.action) {

          route.action(e, route.url);
     }

};


