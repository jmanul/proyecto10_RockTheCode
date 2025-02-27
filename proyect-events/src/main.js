import "../style.css";

import { checkAuth } from './auth/auth.js';
import { renderHomePage } from './pages/home.js';
import { renderRegisterLoginPage } from './pages/registerLogin.js';

document.addEventListener('DOMContentLoaded', async () => {
     const appContainer = document.getElementById('app');
     // Verificar si el usuario está autenticado
     if (checkAuth()) {
          // Renderizar página de eventos
          renderHomePage(appContainer);
     } else {
          // Renderizar página de login/register
          renderRegisterLoginPage(appContainer);
     }
});



