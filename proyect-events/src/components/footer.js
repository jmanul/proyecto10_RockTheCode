import './footer.css';

export const createFooter = () => {

     const footer = document.createElement('footer');
     footer.id = 'footer';
     footer.className = 'footer';
     const footerMaking = document.createElement('div');
     footerMaking.classList.add('flex-container', 'making');
     footer.appendChild(footerMaking);
     footerMaking.innerHTML = `<span class="flex-container"><strong>Hecho con 🤍 por Jmanul</strong><div class="pasttri-logo"><img src="/assets/logoPastri.svg" alt="logo pasttri"></div></span>`;
     
     document.body.appendChild(footer);
     return footer;
}