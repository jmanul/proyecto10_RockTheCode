import "./logo.css";

export const createLogo = () => {

     const logoContainer = document.createElement('div');
     logoContainer.classList.add('flex-container', 'logo');
     const logoImage = document.createElement('img');
     logoImage.src = '/assets/propoysal-person.png';
     logoContainer.appendChild(logoImage);
     return logoContainer;
}