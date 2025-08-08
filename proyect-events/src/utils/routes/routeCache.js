

let pendingRoute = null;

export const setPendingRoute = (route) => {
     pendingRoute = route;
}

export const getPendingRoute = () => {
     return pendingRoute;
}

export const clearPendingRoute = () => {
     pendingRoute = null;
}