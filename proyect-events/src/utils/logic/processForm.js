import { buildFetchFormdata, buildFetchJson } from "../../api/buildFetch";
import { optimizeImage } from "./optimizeImagen";

export const processForm = async (form, route, method, container) => {

     let hasFiles = false;
     let data;
     let request;

     Array.from(form.elements).forEach((element) => {
          if (element.name && !element.disabled) {
               const { name, type, value, files, checked } = element;

               if (type === 'file' && files.length > 0) {

                    hasFiles = true;

                    
               }
          }
     });

     if (hasFiles) {
          data = new FormData();

          const elements = Array.from(form.elements);

          for (const element of elements) {
               if (element.name && !element.disabled) {
                    const { name, type, value, files, checked } = element;

                    if (type === 'file' && files.length > 0) {
                         // Optimizar la imagen y añadirla al FormData
                         try {
                              const optimizedFile = await optimizeImage(files[0]);
                              data.append(name, optimizedFile);
                             
                         } catch (error) {
                              console.error("Error optimizando archivo:", error);
                         }
                    } else if (type === 'checkbox') {
                       
                         data.append(name, checked ? 'true' : 'false'); 

                    } else if (value.trim() !== '') {
                         
                         data.append(name, value);
                    }
               }
          }

          request = await buildFetchFormdata({ route, method, dataForm: data, container });
     } else {

          data = {};

          Array.from(form.elements).forEach((element) => {
               if (element.name && !element.disabled) {
                    const { name, type, value, files, checked } = element;

                    if (type === 'checkbox') {
                         
                         data[name] = checked; 

                    } else if (type !== 'file' && value.trim() !== '') {
                         data[name] = value;
                    }
               }
          });

          request = await buildFetchJson({ route, method, bodyData: data, container });
         
     }

     return request

}