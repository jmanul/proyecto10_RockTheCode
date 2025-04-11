import "../style.css";
import { createFooter } from "./components/footer";
import { createHeader } from "./components/header";
import { renderHomePage } from "./pages/home";
import { allRoutes } from "./utils/routes/routes";

window.addEventListener('load', function () {
     createHeader();
     renderHomePage();
     createFooter();
     window.scrollTo(0, 0);

    
});








