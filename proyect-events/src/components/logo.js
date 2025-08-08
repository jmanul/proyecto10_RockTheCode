import { renderHomePage } from "../pages/home";
import { navigate } from "../utils/logic/navigate";
import "./logo.css";

export const createLogo = (src) => {
     
     
     const logoContainer = document.createElement('div');
     logoContainer.classList.add('flex-container', 'logo');
    
     const logoImage = document.createElement('img');
     logoImage.src = src;
     logoImage.alt = 'icon'
     logoContainer.appendChild(logoImage);
     const homeRoute = {
          url: '/home',
          action: renderHomePage,
          title: 'Propoysal',
          description: 'Descubre y crea los mejores eventos para disfrutar y aprender',
          transitionClass: 'view-transition-form'
          
     }
    
     logoImage.addEventListener('click', (e) => {

          navigate(e, homeRoute);
});
     
     return logoContainer;

  
};