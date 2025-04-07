import { createFooter } from './footer';
import './layout.css';


export const createLayout = () => {
      const appContainer = document.getElementById('app');
          appContainer.classList.add('app', 'flex-container');
          document.body.append(appContainer); 
          appContainer.innerHTML = '';
     const main = document.createElement('main');
     main.classList.add('flex-container');
     main.id = 'main';
     appContainer.prepend(main);
     main.innerHTML = "";
   
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
     const footer = document.querySelector('footer');
     footer.remove();
     createFooter();
     
     return main;
     
}