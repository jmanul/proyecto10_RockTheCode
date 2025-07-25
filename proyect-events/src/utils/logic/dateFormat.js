
//Formatea una fecha para mostrarla al usuario en formato español

export const dateFormat = (date) => {

     // Formatear la fecha
     const formattedDate = date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
     });

     // Formatear la hora
     const formattedTime = date.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
     });

     return {
          date: formattedDate,
          time: formattedTime
     };
};


// Convierte una fecha a formato compatible con inputs type="datetime-local"
export const toLocalDatetimeInput = (dateString) => {
     const date = new Date(dateString);
     if (isNaN(date)) return '';

     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     const hours = String(date.getHours()).padStart(2, '0');
     const minutes = String(date.getMinutes()).padStart(2, '0');

     return `${year}-${month}-${day}T${hours}:${minutes}`;
};