

export const optimizeImage = (file, quality = 0.6, maxWidth = 800) => {
     return new Promise((resolve, reject) => {
          const img = new Image();
          const reader = new FileReader();

          reader.onload = (e) => {
               img.src = e.target.result;
          };

          img.onload = () => {
               const canvas = document.createElement('canvas');

               const scale = Math.min(1, maxWidth / img.width);
               canvas.width = img.width * scale;
               canvas.height = img.height * scale;

               const ctx = canvas.getContext('2d');
               ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

               canvas.toBlob(
                    (blob) => {
                         if (!blob) return reject(new Error("No se pudo comprimir la imagen."));
                         const compressedFile = new File([blob], file.name, {
                              type: 'image/jpeg',
                              lastModified: Date.now()
                         });
                         resolve(compressedFile);
                    },
                    'image/jpeg',
                    quality
               );
          };

          reader.onerror = reject;
          reader.readAsDataURL(file);
     });
}
