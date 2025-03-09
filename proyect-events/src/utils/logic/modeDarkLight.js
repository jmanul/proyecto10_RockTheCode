

// const themeToggle = document.getElementById('theme-toggle');
// const body = document.body;

// const savedTheme = localStorage.getItem('theme');
// if (savedTheme) {
//      body.setAttribute('data-theme', savedTheme);
//      updateButtonText(savedTheme);
// }

// themeToggle.addEventListener('click', () => {
//      if (body.getAttribute('data-theme') === 'dark') {
//           body.setAttribute('data-theme', 'light');
//           localStorage.setItem('theme', 'light');
//      } else {
//           body.setAttribute('data-theme', 'dark');
//           localStorage.setItem('theme', 'dark');
//      }
//      updateButtonText(body.getAttribute('data-theme'));
// });

// function updateButtonText(theme) {
//      themeToggle.textContent = theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
// }