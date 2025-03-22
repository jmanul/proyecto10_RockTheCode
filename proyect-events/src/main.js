import "../style.css";
import { buildFetchJson } from "./api/buildFetch.js";
import { createFooter } from "./components/footer.js";
import { createHeader } from "./components/header.js";
import { createLayout } from "./components/layout.js";
import { createSidebar } from "./components/sidebar.js";

import { renderEventsPage } from './pages/events.js';


const appContainer = document.getElementById('app');
appContainer.classList.add('app','flex-container');
createHeader();
createSidebar();
document.body.appendChild(appContainer);
createLayout(appContainer);
const eventsSection = document.getElementById('events-section');


document.addEventListener("DOMContentLoaded", async () => {

      const request = await buildFetchJson({ route: "/users/userId", container:appContainer });

      console.log(request);    
   
});

const footer = createFooter();
document.body.appendChild(footer);


