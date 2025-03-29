
export const navigate = (e, route) => {
    
     e.preventDefault();
      
     window.history.pushState({}, "", route.url);

     route.action(e, route.url);

};


