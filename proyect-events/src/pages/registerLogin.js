import './registerLogin.css';
import { FormBuilder } from '../components/form.js';
import { renderLoginPage } from './login.js';
import { actionRequest } from '../utils/logic/actionRequest.js';
import { renderHomePage } from './home.js';
import { clearPendingRoute, getPendingRoute } from '../utils/routes/routeCache.js';
import { navigate } from '../utils/logic/navigate.js';




const registerLoginContainer = document.createElement('div');
registerLoginContainer.classList.add('flex-container', 'register-login-container');
const registerLoginGroup = document.createElement('div');
registerLoginGroup.classList.add('flex-container', 'register-login-group');

const loginFields = [
     { type: 'text', name: 'userName', placeholder: 'Usuario', required: true },
     { type: 'password', name: 'password', placeholder: 'Contraseña', required: true },
];

const registerFields = [...loginFields, { type: 'email', name: 'email', placeholder: 'email', required: false }];


export const renderRegisterLoginPage = async () => {
     try {
          // Eliminar el menú de encabezado si existe
          const menuHeader = document.querySelector('.menu-header-web a');
          if (menuHeader) {
               menuHeader.remove();
          } else {
               console.warn("El elemento '.menu-header-web a' no fue encontrado en el DOM.");
          }

          // Limpiar el grupo de registro/inicio de sesión
          registerLoginGroup.innerHTML = '';

          // Limpiar el contenido principal
          const app = document.getElementById('app');
          if (!app) {
               throw new Error("No se encontró el contenedor principal (#app).");
          }
          app.innerHTML = '';

          // Crear el título de inicio de sesión
          const textLogin = document.createElement('h2');
          textLogin.innerText = 'Inicia sesión';
          registerLoginGroup.appendChild(textLogin);

          // Renderizar el formulario de inicio de sesión
          await renderLogin();

          // Crear el título de registro
          const textRegister = document.createElement('h2');
          textRegister.innerText = '¿Aún no tienes una cuenta? Regístrate';
          registerLoginGroup.appendChild(textRegister);

          // Función para renderizar el formulario de registro
          const renderRegister = async () => {
               try {
                    const builder = new FormBuilder(registerFields, 'register');
                    const formRegister = await builder.createForm();

                    if (!formRegister) {
                         throw new Error("No se pudo crear el formulario de registro.");
                    }

                    registerLoginGroup.appendChild(formRegister);

                    // Manejar la solicitud de registro
                    return await actionRequest(formRegister, builder, '/register/', 'POST', renderLoginPage, app);
               } catch (error) {
                    console.error("Error al renderizar el formulario de registro:", error);
                    throw error; // Propagar el error para manejarlo en el nivel superior
               }
          };

          // Renderizar el formulario de registro
          await renderRegister();

          // Añadir el contenedor de registro/inicio de sesión al DOM
          app.appendChild(registerLoginContainer);
          registerLoginContainer.appendChild(registerLoginGroup);

     } catch (error) {
          console.error("Error en renderRegisterLoginPage:", error);

          // Mostrar un mensaje de error genérico en el contenedor principal si existe
          const appContainer = document.getElementById('app');
          if (appContainer) {
               appContainer.innerHTML = "<p>Ocurrió un error al cargar la página de registro/inicio de sesión.</p>";
          }
     }
};


export const renderLogin = async () => {
     try {
          // Actualizar la URL del navegador
          window.history.pushState({}, "", '/register/login');

          // Crear el formulario de inicio de sesión

          const builder = new FormBuilder(loginFields, 'login');
          const formLogin = await builder.createForm();

          if (!formLogin) {
               throw new Error("No se pudo crear el formulario de inicio de sesión.");
          }

          // Añadir el formulario al grupo de registro/inicio de sesión
          registerLoginGroup.appendChild(formLogin);

          // Manejar la solicitud de inicio de sesión
          const app = document.getElementById('app');
          if (!app) {
               throw new Error("No se encontró el contenedor principal (#app).");
          }
          await actionRequest(formLogin, builder, '/register/login/', 'POST', onLoginSuccess, app);

          return formLogin;

     } catch (error) {
          console.error("Error en renderLogin:", error);

          // Mostrar un mensaje de error genérico en el contenedor principal si existe
          const appContainer = document.getElementById('app');
          if (appContainer) {
               appContainer.innerHTML = "<p>Ocurrió un error al cargar el formulario de inicio de sesión.</p>";
          }
     }
};


export const onLoginSuccess = async () => {

     const route = getPendingRoute();
     
     // Limpiar inmediatamente para evitar que quede guardada
     clearPendingRoute();

     await renderHomePage();

     if (route) {
          await navigate(null, route);
     } 
}
