import { buildFetchJson } from "../../api/buildFetch";
import { renderHomePage } from "../../pages/home";
import { clearPendingRoute } from "../routes/routeCache";

export const logout = async () => {

     await buildFetchJson({ route: "/register/logout", method: 'POST' });
     
     // Limpiar cualquier ruta pendiente al cerrar sesión
     clearPendingRoute();

     await renderHomePage();


}