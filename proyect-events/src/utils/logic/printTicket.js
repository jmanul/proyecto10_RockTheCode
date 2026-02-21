
import html2canvas from 'html2canvas';

export const printTicket = async (ticket, containerElement) => {

     if (!ticket) {
          console.error('printTicket: no se recibió el ticket');
          return;
     }

     // Buscar el elemento .event-ticket dentro del contenedor pasado, o en el DOM general
     const ticketElement = containerElement
          ? containerElement.querySelector(".event-ticket")
          : document.querySelector(".event-ticket");

     if (!ticketElement) {
          console.error('printTicket: no se encontró el elemento .event-ticket en el DOM');
          return;
     }

     try {
          //espera a que la imagen de fondo se cargue,
          // obtiene el estilo background-image del contenedor.ticket-image-container
          const ticketImageContainer = ticketElement.querySelector(".ticket-image-container");
          const bgImage = getComputedStyle(ticketImageContainer).backgroundImage;

          const urlMatch = bgImage.match(/url\("?(.+?)"?\)/);
          const bgUrl = urlMatch?.[1];
          
          //  fuerza a que la imagen esté completamente cargada en el navegador antes de hacer la captura con html2canvas

          if (bgUrl) {
               await new Promise((resolve) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.src = bgUrl;
                    img.onload = () => resolve();
                    img.onerror = () => resolve(); // resolver igualmente para no bloquear la descarga
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
          document.body.removeChild(link);

     } catch (error) {
          console.error('printTicket: error al generar la imagen del ticket', error);
     }
};

