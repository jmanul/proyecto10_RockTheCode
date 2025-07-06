

export const optimizeImage = (file, maxWidth = 1024, quality = 0.8) => {
     return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = (e) => {
               const img = new Image();
               img.src = e.target.result;

               img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const scaleFactor = maxWidth / img.width;
                    const width = Math.min(img.width, maxWidth);
                    const height = img.height * scaleFactor;

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                         (blob) => {
                              resolve(blob);
                         },
                         'image/jpeg',
                         quality
                    );
               };
          };
     });
}
