

export const darkLightAction = (darkLightButton, textTheme) => {

     const app = document.getElementById('app');

     const updateButtonText = (theme) => {
          darkLightButton.className = theme === 'dark' ? 'dark-theme-button' : 'light-theme-button';
          textTheme.textContent = theme === 'dark' ? 'dark' : 'light';
          
     }
     // determinar el tema inicial 
     const savedTheme = localStorage.getItem('theme');
     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
     const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
     
     // aplicar tema a cargar
     app.setAttribute('data-theme', initialTheme);
     updateButtonText(initialTheme);

     darkLightButton.addEventListener('click', () => {
          const currentTheme = app.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

          app.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          updateButtonText(newTheme);
     });
}

