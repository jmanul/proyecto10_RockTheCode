import { buildFetchFormdata, buildFetchJson } from "../api/buildFetch";


export const processForm = async (form, route, method) => {

     let hasFiles = false;
     let data;
     let request;

     Array.from(form.elements).forEach((element) => {
          if (element.name && !element.disabled) {
               const { name, type, value, files } = element;

               if (type === 'file' && files.length > 0) {
                    hasFiles = true;
               }
          }
     });

     if (hasFiles) {

    
          data = new FormData();

          Array.from(form.elements).forEach((element) => {
               if (element.name && !element.disabled) {
                    const { name, type, value, files } = element;
                    console.log(element);

                    if (type === 'file' && files.length > 0) {

                         data.append(name, files[0]);

                    } else if (value.trim() !== '') {

                         data.append(name, value);
                    }
               }
         
          });

          request = await buildFetchFormdata(route, method, data);

     } else {

          data = {};

          Array.from(form.elements).forEach((element) => {
               if (element.name && !element.disabled) {
                    const { name, type, value, files } = element;

                    if (type !== 'file' && value.trim() !== '') {
                         data[name] = value;
                    }
               }
          });

          request = await buildFetchJson( route, method, data);
     }

     return request

}