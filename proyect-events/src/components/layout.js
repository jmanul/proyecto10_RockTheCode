import './list.css';
import { typesEventsRoutes } from "../utils/routes/routes";
import { createList } from "./list";

export const createLayout = (element) => {

     const main = document.createElement('main');
     main.classList.add('flexContainer');
     main.innerHTML = "";
     element.appendChild(main);
     const title = document.createElement('h1');
     title.textContent = 'Propo y Sal';
     const eventsTypeMenu = createList('events-type-menu', typesEventsRoutes);
     main.appendChild(title);
     main.appendChild(eventsTypeMenu);
     const gridMain = document.createElement('div');
     gridMain.classList.add('grid-main');
   
     gridMain.innerHTML = `<section id= "events-section" class="events-section, flex-container">
    <div class="text-events"></div>
  <div class="grid-events"></div>
</section>
<section id= "info-section" class="info-section, flex-container">
  <div class="text-passes"></div>
  <div class="div-passes"></div>
</section>`;
     
      main.appendChild(gridMain);
     
}