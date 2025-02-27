

export function processForm(form) {
     let hasFiles = false;
     let result;

     Array.from(form.elements).forEach((element) => {
          if (element.name && !element.disabled) {
               const { name, type, value, files } = element;

               if (type === 'file' && files.length > 0) {
                    hasFiles = true;
               }
          }
     });

     if (hasFiles) {

    
          result = new FormData();
          Array.from(form.elements).forEach((element) => {
               if (element.name && !element.disabled) {
                    const { name, type, value, files } = element;
                    console.log(element);

                    if (type === 'file' && files.length > 0) {

                         result.append(name, files[0]);

                    } else if (value.trim() !== '') {

                         result.append(name, value);
                    }
               }
         
          });
     } else {
          result = {};
          Array.from(form.elements).forEach((element) => {
               if (element.name && !element.disabled) {
                    const { name, type, value, files } = element;

                    if (type !== 'file' && value.trim() !== '') {
                         result[name] = value;
                    }
               }
          });
     }

     return result;
}