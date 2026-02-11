
import { navigate } from '../utils/logic/navigate';
import './list.css';
   

export const createList = (nameClass, list) => {

     const nav = document.createElement('nav');
     nav.id = `nav-${nameClass}`;
     nav.className = `nav-${nameClass}`;

     // Botón toggle para menús desplegables (events-type-menu y events-user-menu)
     const isDropdown = nameClass === 'events-type-menu' || nameClass === 'events-user-menu';
     if (isDropdown) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'dropdown-toggle flex-container';
          toggleBtn.type = 'button';
          const label = nameClass === 'events-type-menu' ? 'Categorías' : 'Opciones';
          toggleBtn.innerHTML = `<span>${label}</span><i class="bi bi-chevron-down dropdown-arrow"></i>`;
          toggleBtn.addEventListener('click', () => {
               nav.classList.toggle('open');
          });
          nav.appendChild(toggleBtn);

          // Cerrar si se hace clic fuera
          document.addEventListener('click', (e) => {
               if (!nav.contains(e.target)) {
                    nav.classList.remove('open');
               }
          });
     }

     const ulList = document.createElement('ul');
     ulList.classList.add(nameClass, 'flex-container');
     ulList.id = nameClass;
     nav.append(ulList);

     for (const item of list) {

          const a = document.createElement('a');
          a.className = 'menu-option'
          a.href = item.url;
          a.setAttribute('data-link', "");
          a.target = '_blank';
          ulList.append(a);
          const li = document.createElement('li');
          li.className = 'flex-container'
          a.append(li);
          a.addEventListener('click', (e) => {

               const activeOption = document.querySelector('.active-route');
               activeOption?.classList.remove('active-route');
               
               a.classList.add('active-route');

               // Cerrar el desplegable tras seleccionar
               if (isDropdown) {
                    nav.classList.remove('open');
                    // Actualizar texto del botón
                    const toggleLabel = nav.querySelector('.dropdown-toggle span');
                    if (toggleLabel) toggleLabel.textContent = item.name;
               }

               return navigate(e, item);
              
          });

          if (item.icon) {
               const img = document.createElement('img');
               img.classList.add('item-icon', item.id);
               img.src = `/assets/${item.icon}`;
               img.alt = 'menu icon'
               const div = document.createElement('div');
               div.classList.add(item.id,'flex-container');
               div.appendChild(img);
               li.appendChild(div);
          }
          const p = document.createElement('p');
          p.classList.add('item-text', item.id);
          p.innerText = item.name;
          li.append(p);
          ulList.appendChild(a)

     }

     return nav;
}