


export const navigate = (e, route) => {

     e.preventDefault();

     window.history.pushState({}, "", route.url);

     return route.action(route.url);
};


