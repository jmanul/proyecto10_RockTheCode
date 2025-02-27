import './registerLogin.css';
import { CreateForm } from '../components/form.js';
import { processForm } from '../utils/processForm.js';
import { buildFetchJson } from '../api/buildFetch.js';

export function renderRegisterLoginPage(container) {
     container.innerHTML = '';

     const loginFields = [
          { type: 'text', name: 'userName', placeholder: 'Usuario', required: true },
          { type: 'password', name: 'password', placeholder: 'Contraseña', required: true },
     ];

     const form = CreateForm(loginFields, async (form) => {
          const dataForm = processForm(form); 

          const request = await buildFetchJson('/register/login/', 'POST', dataForm);

          // Acceder a los datos de la respuesta
          console.log("Inicio de sesión exitoso:", request);

          // Redirigir o actualizar la interfaz
          alert("Inicio de sesión exitoso!");
          window.location.href = "/home"; // Simular cambio de página

        
     });

     container.appendChild(form);
}
