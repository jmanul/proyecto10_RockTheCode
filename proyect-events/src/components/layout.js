import './layout.css';
import { typesEventsRoutes } from "../utils/routes/routes";
import { createList } from "./list";
import { createTitle } from './title';

export const createLayout = (container) => {

     const main = document.createElement('main');
     main.classList.add('flex-container');
     main.id = 'main';
     container.prepend(main);
     main.innerHTML = "";
     const contentImageTitle = document.createElement('div');
     contentImageTitle.classList.add('content-image-title', 'flex-container');
     contentImageTitle.innerHTML = `<div class="image-title"><img src="/assets/propoysal-franky.webp" alt="girl"></div>
<div class="image-title"><img src="/assets/propoysal-girl-pink.webp" alt="girl"></div>`;
     main.append(contentImageTitle);
     const title = createTitle();
     const eventsTypeMenu = createList('events-type-menu', typesEventsRoutes);
     main.appendChild(eventsTypeMenu);
     main.appendChild(title);
    
     const gridMain = document.createElement('div');
     gridMain.classList.add('grid-main');
   
     gridMain.innerHTML = `<section id= "events-section" class="events-section, flex-container">
    <div class="text-events"></div>
  <div class="grid-events flex-container"></div>
</section>
<section id= "info-section" class="info-section, flex-container">
  <div class="text-passes"></div>
  <div class="div-passes flex-container"></div>
</section>`;
     
     main.appendChild(gridMain);
     
     return main;
     
}