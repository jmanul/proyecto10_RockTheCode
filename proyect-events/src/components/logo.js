import "./logo.css";

export const createLogo = (src) => {

     const logoContainer = document.createElement('div');
     logoContainer.classList.add('flex-container', 'logo');
     const logoImage = document.createElement('img');
     logoImage.src = src;
     logoContainer.appendChild(logoImage);
     return logoContainer;
}