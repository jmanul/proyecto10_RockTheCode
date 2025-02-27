

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const buildFetchJson = async (route, method, dataForm) => {

     try {
          const response = await fetch(API_BASE_URL + route, {
               method: method,
               credentials: "include",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(dataForm),
          });

          if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          return data; 

     } catch (error) {
          console.error("Error en la solicitud:", error.message);
          throw error; 
     }


}


export const buildFetchFormdata = async (route, method, dataForm) => {

    await fetch(API_BASE_URL + route, {
          method: method,
          credentials: "include",
          body: dataForm, 
          
     })
          .then(response => {
               if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
               }
               return response.json();
          })
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
}



