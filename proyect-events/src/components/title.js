import "./title.css"

export const createTitle = () => {

     const titleContainer = document.createElement('div');
     titleContainer.classList.add('flex-container', 'title-container');
     titleContainer.innerHTML = `
  <div class="title-up"></div>
  <div class="title-title"><h1>Propo y Sal</h1></div>
  <div class="title-down flex-container">
    <div class="left-down"></div>
  <div class="right-down"></div></div>
`;
     return titleContainer;
}