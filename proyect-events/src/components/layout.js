import './layout.css';
import { typesEventsRoutes } from "../utils/routes/routes";
import { createList } from "./list";
import { createTitle } from './title';

export const createLayout = (element) => {

     const main = document.createElement('main');
     main.classList.add('flex-container');
     main.innerHTML = "";
     element.appendChild(main);
     const contentImageTitle = document.createElement('div');
     contentImageTitle.classList.add('content-image-title', 'flex-container');
     contentImageTitle.innerHTML = `<div class="image-title"><img src="/assets/propoysal-franky.png" alt="girl"></div>
<div class="image-title"><img src="/assets/propoysal-girl-pink.png" alt="girl"></div>`;
     main.append(contentImageTitle);
     const title = createTitle();
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
     
     return main;
     
}