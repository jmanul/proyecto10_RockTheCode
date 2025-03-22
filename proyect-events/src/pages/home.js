
export const renderHomePage = async () => {

     const appContainer = document.getElementById('app');
     appContainer.classList.add('app','flex-container');
     createHeader();
     createSidebar();
     document.body.appendChild(appContainer);
     createLayout(appContainer);
     const eventsSection = document.getElementById('events-section');
     const request = await buildFetchJson({ route: "/userId" });

     const footer = createFooter();
     document.body.appendChild(footer);


}