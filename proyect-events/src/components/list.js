
import './list.css';
   

export const createList = (nameClass, list) => {

     const nav = document.createElement('nav');
     const ulList = document.createElement('ul');
     ulList.classList.add(nameClass, 'flex-container');
     ulList.id = nameClass;
     nav.append(ulList);

     for (const item of list) {

          const a = document.createElement('a');
          a.href = item.url;
          a.target = '_blank';
          ulList.append(a);
          const li = document.createElement('li');
          a.append(li);
          a.addEventListener('click', (e) => console.log('funcion que navega a la ruta',e));

          if (item.icon) {
               const img = document.createElement('img');
               img.classList.add('menu-mobile', item.id);
               img.src = `/public/assets/${item.icon}`;
               const div = document.createElement('div');
               div.classList.add(item.id);
               div.appendChild(img);
               li.appendChild(div);
          }
          const p = document.createElement('p');
          p.classList.add('menu-web', item.id);
          p.innerText = item.name;
          li.append(p);
          ulList.appendChild(a)

     }

     return nav;
}