

export const darkLightAction = (darkLightButton, textTheme) => {

     const app = document.getElementById('app');

     const updateButtonText = (theme) => {
          darkLightButton.className = theme === 'dark' ? 'dark-theme-button' : 'light-theme-button';
          textTheme.textContent = theme === 'dark' ? 'dark' : 'light';
          
     }
   

     const savedTheme = localStorage.getItem('theme');
     if (savedTheme) {
          app.setAttribute('data-theme', savedTheme);
          updateButtonText(savedTheme);
     }

     darkLightButton.addEventListener('click', () => {
          if (app.getAttribute('data-theme') === 'dark') {
               app.setAttribute('data-theme', 'light');
               localStorage.setItem('theme', 'light');
          } else {
               app.setAttribute('data-theme', 'dark');
               localStorage.setItem('theme', 'dark');
          }
          updateButtonText(app.getAttribute('data-theme'));
     });

 
}

//darkLightButton.style.flex-direction = "row-reverse"