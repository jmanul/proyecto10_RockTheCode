
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


// export const generateWalletImage = async (elementId) => {
//      const ticket = document.getElementById(elementId);

//      const canvas = await html2canvas(ticket, {
//           scale: 1.5,
//           logging: false,
//           backgroundColor: '#ffffff',
//           useCORS: true
//      });

//      return {
//           png: canvas.toDataURL('image/png'),
//           jpeg: canvas.toDataURL('image/jpeg', 0.85)
//      };
// };

// export const downloadAsPDF = async (elementId, fileName) => {
//      const { jsPDF } = await import('jspdf');
//      const ticket = document.getElementById(elementId);

//      const canvas = await html2canvas(ticket, {
//           scale: 2,
//           logging: false
//      });

//      const pdf = new jsPDF('p', 'mm', [90, 140]); // Tamaño ticket
//      pdf.addImage(canvas, 'JPEG', 0, 0, 90, 140);
//      pdf.save(`${fileName}.pdf`);
// };

// export const saveToWallet = async (elementId, ticketData) => {
//      const { png } = await generateWalletImage(elementId);

//      // Crear enlace de descarga
//      const link = document.createElement('a');
//      link.href = png;
//      link.download = `ticket_${ticketData._id}.png`;
//      document.body.appendChild(link);
//      link.click();
//      document.body.removeChild(link);

//      // Guía para el usuario
//      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//           alert('Descarga completada. Abre la imagen, pulsa compartir y selecciona "Añadir a Wallet"');
//      } else if (/Android/i.test(navigator.userAgent)) {
//           alert('Abre Google Pay, toca "Añadir tarjeta" y selecciona esta imagen');
//      }
// };