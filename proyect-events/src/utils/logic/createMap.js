/**
 * Crea un mapa de Google Maps embebido + enlace directo
 * 
 * @param {string} fullAddress - Dirección completa del evento
 * @returns {HTMLElement} Contenedor del mapa y enlace
 */
export function createMap(fullAddress) {

     if (!fullAddress) return null;

     // Contenedor principal del grupo mapa + enlace
     const mapGroupContainer = document.createElement('div');
     mapGroupContainer.classList.add('event-map-group', 'flex-container');

     // Contenedor del iframe
     const mapContainer = document.createElement('div');
     mapContainer.classList.add('event-map');

     // Iframe embebido de Google Maps
     const mapIframe = document.createElement('iframe');
     mapIframe.width = "100%";
     mapIframe.height = "300";
     mapIframe.style.border = "0";
     mapIframe.loading = "lazy";
     mapIframe.referrerPolicy = "no-referrer-when-downgrade";
     mapIframe.src = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

     mapContainer.appendChild(mapIframe);

     // Enlace directo a Google Maps (abrirá el mapa completo)
     const mapsLink = document.createElement('a');
     mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
     mapsLink.target = "_blank";
     mapsLink.rel = "noopener noreferrer";
     mapsLink.textContent = "Ver en Google Maps";
     mapsLink.classList.add('maps-link');

     // Añadir al contenedor principal
     mapGroupContainer.appendChild(mapContainer);
     mapGroupContainer.appendChild(mapsLink);

     return mapGroupContainer;
}



/**
 * Construye una dirección completa a partir de los datos del evento.
 * 
 * @param {Object} data - Datos del evento (address, city, location, postalCode, country)
 * @returns {string|null} Dirección completa formateada o null si no hay datos suficientes.
 */
export function buildFullAddress(data) {
     if (!data) return null;

     const { location, address, postalCode, city, country } = data;

     // Si no hay país, evitamos errores
     const countryCode = country?.code || country?.name || "";

     // Si no hay datos suficientes, no devolvemos nada
     if (!address && !city && !postalCode && !location && !countryCode) {
          return null;
     }

     // Construcción ordenada de los fragmentos de dirección
     const parts = [address, location, city, postalCode, countryCode]
          .filter(Boolean) // elimina valores falsy (null, undefined, "")
          .map(part => part.trim()) // limpia espacios
          .filter(part => part.length > 0); // evita cadenas vacías

     // Unimos los fragmentos separados por coma
     return parts.join(', ');
}
