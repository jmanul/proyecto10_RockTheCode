import './message.css';

export const createMessage = (container, text, optionClassResponse) => {

  console.log('estoy encreatemessage');

     const messageContainer = document.createElement('div');
     messageContainer.classList.add('flex-container', 'message-container', 'hide', optionClassResponse);
     messageContainer.id = 'message-container';
     const message = document.createElement('p');
     message.innerText = text;
     container.appendChild(messageContainer);
     messageContainer.appendChild(message);

     console.log(message.innerText);
    

     setTimeout(() => {
        

          setTimeout(() => {
               
               messageContainer.classList.remove('success', 'error', 'hide');
          }, 5000);
     }, 3000); 

  
};

