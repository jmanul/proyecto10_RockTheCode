import './registerLogin.css';
import { CreateForm } from '../components/form.js';
import { processForm } from '../utils/processForm.js';
import { buildFetchJson } from '../api/buildFetch.js';
import { renderHomePage } from './home.js';


export const renderRegisterLoginPage = (container) => {
     container.innerHTML = '';

     const loginFields = [
          { type: 'text', name: 'userName', placeholder: 'Usuario', required: true },
          { type: 'password', name: 'password', placeholder: 'Contraseña', required: true },
     ];

     const registerFields = [...loginFields];

     const form = CreateForm(loginFields, async (form) => {
          
          try {
               const dataForm = processForm(form);

               const request = await buildFetchJson('/register/login/', 'POST', dataForm);

               if (request) {
                    console.log("Login exitoso:", request);

                    // Redirige solo si la respuesta es válida
                    window.location.href = "/home";
                    await renderHomePage(container);
                    return; // Detiene la ejecución aquí para evitar la redirección errónea
               }

               console.error("Error: Respuesta inválida del servidor.");
          } catch (error) {
               console.error("Error en el login:", error);
          }

          // Si hay un error o `request` es null/undefined, redirige a la página de login
          window.location.href = "/register-login";
     });


     container.appendChild(form);

     
}
