import './message.css';

export const createMessage = (text, optionClassResponse = null, container = null) => {

     const appContainer = document.getElementById('app');
     
     container = container || appContainer;

     setTimeout(() => {

          const messageContainer = document.createElement('div');
          messageContainer.classList.add('flex-container', 'message-container', 'hide', optionClassResponse);
          
          const message = document.createElement('p');
          message.innerText = text;
          const closebutton = document.createElement('button');
          closebutton.textContent = `cerrar`;
          messageContainer.appendChild(message);
          messageContainer.appendChild(closebutton);
          container.appendChild(messageContainer)

          closebutton.addEventListener('click', () => {
               messageContainer.remove();
          }, { once: true });

          setTimeout(() => {
               messageContainer.classList.remove('hide');
          }, 50);

          setTimeout(() => {
               messageContainer.classList.add('hide');

               messageContainer.addEventListener('transitionend', () => {
                    messageContainer.remove();
               }, { once: true });

          }, 2000);
     }, 1000);
}
