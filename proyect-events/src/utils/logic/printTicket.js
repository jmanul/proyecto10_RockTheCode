
import html2canvas from 'html2canvas';

export const printTicket = async (e, route) => {
     
   
     const ticket = route.ticket;
     const ticketElement = document.querySelector(".event-ticket");
     if (!ticketElement) return;

     //espera a que la imagen de fondo se cargue,
     // obtiene el estilo background-image del contenedor.ticket-image-container
     const ticketImageContainer = ticketElement.querySelector(".ticket-image-container");
     const bgImage = getComputedStyle(ticketImageContainer).backgroundImage;

     const urlMatch = bgImage.match(/url\("?(.+?)"?\)/);
     const bgUrl = urlMatch?.[1];
     
     //  fuerza a que la imagen esté completamente cargada en el navegador antes de hacer la captura con html2canvas

     if (bgUrl) {
          await new Promise((resolve, reject) => {
               const img = new Image();
               img.src = bgUrl;
               img.onload = () => resolve();
               img.onerror = () => reject(new Error("Error cargando imagen de fondo"));
          });
     }

     // Captura la imagen
     const canvas = await html2canvas(ticketElement, { scale: 2, useCORS: true });
     const image = canvas.toDataURL("image/png");

     // descargar
     const link = document.createElement("a");
     link.href = image;
     link.download = `ticket-${ticket._id}.png`;
     document.body.appendChild(link);
     link.click();
     
};


