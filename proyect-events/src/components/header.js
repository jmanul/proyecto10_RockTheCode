import "./header.css"
import { createList } from "./list";
import { createThemeButton } from "./themeButton";
import { createLogo } from "./logo";
import { loginRoutes } from "../utils/routes/routes";

export const createHeader = () => {
     
     const header = document.createElement('header');
     
     header.className = 'flex-container';
     header.id = 'header';
     const logo = createLogo('https://res.cloudinary.com/dn6utw1rl/image/upload/v1749542930/default/ajnuvbrizk2z6rbdfken.png');
     header.appendChild(logo);
    
     // Crear menú normalmente
     const menuHeader = createList('menu-header-web', loginRoutes);
     header.appendChild(menuHeader);
     // Botón de tema: se añade directamente al header
     const darkLightButton = createThemeButton();
     darkLightButton.id = 'theme-button-global';
     header.appendChild(darkLightButton);

     // Mover el botón de tema entre header y nav según el tamaño de pantalla
     const moveThemeButton = () => {
          const navMenu = document.getElementById('nav-menu-header-web');
          const isTablet = window.innerWidth <= 1024;
          if (isTablet && navMenu) {
               // En tablet/móvil: mover al final del nav del menú
               navMenu.appendChild(darkLightButton);
          } else {
               // En desktop: mover al header (antes del hamburger)
               const hBtn = document.getElementById('hamburger-btn');
               if (hBtn) {
                    header.insertBefore(darkLightButton, hBtn);
               } else {
                    header.appendChild(darkLightButton);
               }
          }
     };
     window.addEventListener('resize', moveThemeButton);

     // Botón hamburguesa para móvil (se añade al final)
     const hamburgerBtn = document.createElement('button');
     hamburgerBtn.className = 'hamburger-btn';
     hamburgerBtn.id = 'hamburger-btn';
     hamburgerBtn.innerHTML = '<i class="bi bi-list"></i>';
     hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
     header.appendChild(hamburgerBtn);

     // Toggle del menú en móvil
     hamburgerBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Buscar el nav directamente por ID para asegurar que es el correcto
          const navMenu = document.getElementById('nav-menu-header-web');
          
          if (!navMenu) {
               console.error('No se encontró el elemento nav-menu-header-web');
               return;
          }
          
          console.log('Click detectado - navMenu:', navMenu);
          
          const isOpen = navMenu.classList.toggle('menu-open');
          hamburgerBtn.classList.toggle('active');
          
          // Aplicar estilos directamente
          if (isOpen) {
               navMenu.style.visibility = 'visible';
               navMenu.style.clipPath = 'none';
               navMenu.style.opacity = '1';
               navMenu.style.maxHeight = '80vh';
               navMenu.style.pointerEvents = 'auto';
               navMenu.style.overflowY = 'auto';
               console.log('Menú ABIERTO');
          } else {
               navMenu.style.visibility = '';
               navMenu.style.clipPath = '';
               navMenu.style.opacity = '';
               navMenu.style.maxHeight = '';
               navMenu.style.pointerEvents = '';
               navMenu.style.overflowY = '';
               console.log('Menú CERRADO');
          }
          
          // Cambiar icono
          const icon = hamburgerBtn.querySelector('i');
          if (isOpen) {
               icon.className = 'bi bi-x-lg';
               hamburgerBtn.setAttribute('aria-label', 'Cerrar menú');
          } else {
               icon.className = 'bi bi-list';
               hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
          }
          
          console.log('Estado:', navMenu.style.visibility, navMenu.className);
     });

     // Función para cerrar el menú
     const closeMenu = () => {
          const navMenu = document.getElementById('nav-menu-header-web');
          if (navMenu) {
               navMenu.classList.remove('menu-open');
               navMenu.style.visibility = '';
               navMenu.style.clipPath = '';
               navMenu.style.opacity = '';
               navMenu.style.maxHeight = '';
               navMenu.style.pointerEvents = '';
               navMenu.style.overflowY = '';
          }
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.querySelector('i').className = 'bi bi-list';
     };

     // Cerrar menú al hacer clic en una opción (móvil)
     menuHeader.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
               closeMenu();
          });
     });

     // Cerrar menú al hacer clic fuera
     document.addEventListener('click', (e) => {
          if (!header.contains(e.target) && menuHeader.classList.contains('menu-open')) {
               closeMenu();
          }
     });

     document.body.prepend(header);
     moveThemeButton();

};
