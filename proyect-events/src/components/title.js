import "./title.css"

export const createTitle = () => {

  const titleSection = document.createElement('section');
  titleSection.classList.add('flex-container', 'title-section');
  
     const imageTitleRight = document.createElement('div');
       imageTitleRight.classList.add('image-title', 'flex-container');
  imageTitleRight.innerHTML = `<img src="https://res.cloudinary.com/dn6utw1rl/image/upload/v1749923403/default/reos3dspnbof4m4mocah.webp" alt="franky">`;
       titleSection.append(imageTitleRight);
     const titleContainer = document.createElement('div');
     titleContainer.classList.add('flex-container', 'title-container');
     titleContainer.innerHTML = `
  <div class="title-up"></div>
  <div class="title-title"><h1>Propo y Sal</h1></div>
  <div class="title-down flex-container">
    <div class="left-down"></div>
  <div class="right-down"></div></div>
`;
  
  const imageTitleLeft = document.createElement('div');
  imageTitleLeft.classList.add('image-title', 'flex-container');
  imageTitleLeft.innerHTML = `<img src="https://res.cloudinary.com/dn6utw1rl/image/upload/v1750679294/default/zvwwv5kprwrpktnerr6t.webp" alt="girl">`;
  titleSection.appendChild(titleContainer);
  titleSection.appendChild(imageTitleLeft);
  return titleSection;
}