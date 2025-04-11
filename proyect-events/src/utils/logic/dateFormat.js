

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