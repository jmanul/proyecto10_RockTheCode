/**
 * Utilidad reutilizable para infinite scroll
 * Permite cargar más elementos a medida que el usuario hace scroll
 * 
 * @param {Object} options - Opciones de configuración
 * @param {HTMLElement} options.container - Contenedor donde se observa el scroll
 * @param {Function} options.fetchData - Función async que obtiene los datos (recibe page como parámetro)
 * @param {Function} options.renderItem - Función que renderiza cada elemento
 * @param {HTMLElement} options.targetContainer - Contenedor donde se añaden los elementos
 * @param {number} options.initialPage - Página inicial (default: 1)
 * @param {number} options.threshold - Distancia del fondo para activar carga (default: 100px)
 * 
 * @returns {Object} { loadMore, reset, destroy, getState }
 */
export const createInfiniteScroll = ({
     container,
     fetchData,
     renderItem,
     targetContainer,
     initialPage = 1,
     threshold = 100
}) => {
     // Estado interno
     let state = {
          currentPage: initialPage,
          isLoading: false,
          hasMore: true,
          totalItems: 0
     };

     let observer = null;
     let sentinelElement = null;

     /**
      * Crea el elemento sentinel que activa la carga
      */
     const createSentinel = () => {
          sentinelElement = document.createElement('div');
          sentinelElement.className = 'infinite-scroll-sentinel';
          sentinelElement.style.height = '1px';
          sentinelElement.style.width = '100%';
          return sentinelElement;
     };

     /**
      * Carga más elementos
      */
     const loadMore = async () => {
          if (state.isLoading || !state.hasMore) return;

          state.isLoading = true;

          try {
               const result = await fetchData(state.currentPage);
               
               if (!result) {
                    state.hasMore = false;
                    return;
               }

               const { data, pagination } = result;

               if (data && data.length > 0) {
                    // Renderizar cada elemento
                    data.forEach(item => {
                         const element = renderItem(item);
                         if (element) {
                              // Insertar antes del sentinel
                              if (sentinelElement && sentinelElement.parentNode) {
                                   targetContainer.insertBefore(element, sentinelElement);
                              } else {
                                   targetContainer.appendChild(element);
                              }
                         }
                    });

                    state.totalItems += data.length;
                    state.currentPage++;
                    state.hasMore = pagination?.hasNextPage ?? false;
               } else {
                    state.hasMore = false;
               }

          } catch (error) {
               console.error('Error en infinite scroll:', error);
               state.hasMore = false;
          } finally {
               state.isLoading = false;
          }
     };

     /**
      * Inicializa el Intersection Observer
      */
     const initObserver = () => {
          // Crear sentinel si no existe
          if (!sentinelElement) {
               sentinelElement = createSentinel();
               targetContainer.appendChild(sentinelElement);
          }

          // Crear observer
          observer = new IntersectionObserver(
               (entries) => {
                    entries.forEach(entry => {
                         if (entry.isIntersecting && !state.isLoading && state.hasMore) {
                              loadMore();
                         }
                    });
               },
               {
                    root: container === window ? null : container,
                    rootMargin: `${threshold}px`,
                    threshold: 0
               }
          );

          observer.observe(sentinelElement);
     };

     /**
      * Reinicia el estado y limpia el contenedor
      */
     const reset = () => {
          state = {
               currentPage: initialPage,
               isLoading: false,
               hasMore: true,
               totalItems: 0
          };

          // Limpiar contenedor pero mantener el sentinel
          const children = Array.from(targetContainer.children);
          children.forEach(child => {
               if (child !== sentinelElement) {
                    child.remove();
               }
          });
     };

     /**
      * Destruye el observer y limpia recursos
      */
     const destroy = () => {
          if (observer) {
               observer.disconnect();
               observer = null;
          }
          if (sentinelElement) {
               sentinelElement.remove();
               sentinelElement = null;
          }
     };

     /**
      * Obtiene el estado actual
      */
     const getState = () => ({ ...state });

     /**
      * Inicializa y carga la primera página
      */
     const init = async () => {
          initObserver();
          await loadMore();
     };

     return {
          init,
          loadMore,
          reset,
          destroy,
          getState
     };
};
