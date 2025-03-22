import './message.css';

export const createMessage = (text, optionClassResponse, container = null) => {
     
     container = container || document.body;

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

          }, 7000);
     }, 1000);
}
