import './registerLogin.css';

import { renderLogin } from './registerLogin.js';


export const renderLoginPage = async () => {
     try {
          // Actualizar la URL del navegador
          window.history.pushState({}, "", '/login');

          // Seleccionar el contenedor principal
          const app = document.getElementById('app');
          if (!app) {
               throw new Error("No se encontró el contenedor principal (#app).");
          }

          app.innerHTML = '';

          // Renderizar el formulario de inicio de sesión
          const login = await renderLogin();
          if (!login) {
               throw new Error("No se pudo renderizar el formulario de inicio de sesión.");
          }

          app.appendChild(login);

     } catch (error) {
          console.error("Error en renderLoginPage:", error);

          const appContainer = document.getElementById('app');
          if (appContainer) {
               appContainer.innerHTML = "<p>Ocurrió un error al cargar la página de inicio de sesión.</p>";
          }
     }
};

