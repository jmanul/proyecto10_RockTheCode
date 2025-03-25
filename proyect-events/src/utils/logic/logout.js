import { buildFetchJson } from "../../api/buildFetch";
import { renderHomePage } from "../../pages/home";

export const logout = async () => {

     await buildFetchJson({ route: "/register/logout", method: 'POST' });

     await renderHomePage();


}