import { createFooter } from './footer';
import './layout.css';


export const createLayout = () => {
      const appContainer = document.getElementById('app');
          appContainer.classList.add('app', 'flex-container');
          document.body.append(appContainer); 
          appContainer.innerHTML = '';
     const main = document.createElement('main');
     main.classList.add('flex-container', 'main');
     main.id = 'main';
     appContainer.prepend(main);
     main.innerHTML = "";
   
     const gridMain = document.createElement('div');
     gridMain.classList.add('grid-main', 'flex-container');
   
     gridMain.innerHTML = `<section id= "events-section" class="events-section flex-container">
    <div class="text-events"></div>
  <div class="grid-events flex-container"></div>
</section>
<section id= "info-section" class="info-section flex-container">
  <div class="text-passes"></div>
  <div class="div-passes flex-container"></div>
</section>
<section id= "info-grid-section" class="info-grid-section flex-container">
  <div class="text-grid-passes"></div>
  <div class="div-grid-passes flex-container"></div>
</section>

`;
     
     main.appendChild(gridMain);
     const footer = document.querySelector('footer');
     if (footer) {
          footer.remove();
     }
     createFooter();
     
     return main;
     
}