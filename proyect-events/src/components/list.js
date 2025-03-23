
import { navigate } from '../utils/logic/navigate';
import './list.css';
   

export const createList = (nameClass, list) => {

     const nav = document.createElement('nav');
     const ulList = document.createElement('ul');
     ulList.classList.add(nameClass, 'flex-container');
     ulList.id = nameClass;
     nav.append(ulList);

     for (const item of list) {

          const a = document.createElement('a');
          a.className = 'flex-container'
          a.href = item.url;
          a.target = '_blank';
          ulList.append(a);
          const li = document.createElement('li');
          li.className = 'flex-container'
          a.append(li);
          a.addEventListener('click', (e) => {

               e.preventDefault();
               return item.action();
          });

          if (item.icon) {
               const img = document.createElement('img');
               img.classList.add('item-icon', item.id);
               img.src = `/assets/${item.icon}`;
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