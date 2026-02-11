import './notFound.css';
import { createLayout } from '../components/layout';
import { renderHomePage } from './home';
import { navigate } from '../utils/logic/navigate';

/**
 * Renderiza la página 404 - Not Found
 */
export const renderNotFoundPage = async () => {
     try {
          const appContainer = document.getElementById('app');
          if (!appContainer) {
               throw new Error("No se encontró el contenedor principal (#app).");
          }

          const main = createLayout(appContainer);
          
          // Limpiar contenido previo
          const gridEvents = document.querySelector('.grid-events');
          const gridMain = document.querySelector('.grid-main');
          
          if (gridMain) {
               gridMain.style.gridTemplateColumns = '1fr';
          }

          if (gridEvents) {
               gridEvents.innerHTML = '';
               gridEvents.classList.add('not-found-container');

               // Contenedor principal
               const notFoundContent = document.createElement('div');
               notFoundContent.classList.add('not-found-content', 'flex-container');

               // Número 404
               const notFoundNumber = document.createElement('h1');
               notFoundNumber.classList.add('not-found-number');
               notFoundNumber.textContent = '404';

               // Icono triste
               const notFoundIcon = document.createElement('img');
               notFoundIcon.src = 'https://res.cloudinary.com/dn6utw1rl/image/upload/v1753817663/default/sad-icon-logo_bbyzbd.png';
               notFoundIcon.alt = 'Página no encontrada';
               notFoundIcon.classList.add('not-found-icon');

               // Mensaje
               const notFoundMessage = document.createElement('h2');
               notFoundMessage.classList.add('not-found-message');
               notFoundMessage.textContent = '¡Ups! Página no encontrada';

               // Descripción
               const notFoundDescription = document.createElement('p');
               notFoundDescription.classList.add('not-found-description');
               notFoundDescription.textContent = 'La página que buscas no existe o ha sido movida. Pero no te preocupes, ¡hay muchos eventos esperándote!';

               // Botón para volver al inicio
               const homeButton = document.createElement('button');
               homeButton.classList.add('not-found-btn', 'btn-primary');
               homeButton.textContent = 'Volver al inicio';
               homeButton.addEventListener('click', (e) => {
                    navigate(e, {
                         url: '/home',
                         action: renderHomePage,
                         title: "PropoySal - Eventos y experiencias únicas",
                         description: "Descubre y crea los mejores eventos culturales, sociales y de entretenimiento."
                    });
               });

               // Ensamblar
               notFoundContent.appendChild(notFoundNumber);
               notFoundContent.appendChild(notFoundIcon);
               notFoundContent.appendChild(notFoundMessage);
               notFoundContent.appendChild(notFoundDescription);
               notFoundContent.appendChild(homeButton);

               gridEvents.appendChild(notFoundContent);
          }

     } catch (error) {
          console.error("Error en renderNotFoundPage:", error);
     }
};
