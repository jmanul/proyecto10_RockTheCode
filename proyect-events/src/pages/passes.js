
import { buildFetchJson } from '../api/buildFetch';
import { actionButton, itemDetails } from '../components/itemDetails';
import { dateFormat } from '../utils/logic/dateFormat';
import './passes.css'
import { renderRegisterLoginPage } from './registerLogin';

const keyMapPass = {
     namePass: { icon: "bi-info-circle" },
     passPrice: { icon: "bi-geo-alt" },
     maxCapacityPass: { icon: "bi-buildings" },
     startDateFormatted: { icon: "bi-calendar-pass" },
     startTimeFormatted: { icon: "bi-clock" },
     endDateFormatted: { icon: "bi-calendar-x" },
   
};



export const renderPasesPage = async (e, route) => {

     try {

          const passes = await buildFetchJson({ route });
          console.log(passes);
          const eventsSection = document.querySelector('.grid-events');
          const passesContainer = document.createElement("div");
          passesContainer.classList.add("events-container", "flex-container");

          eventsSection.innerHTML = '';

          if (!passes || passes.length === 0) {
               eventsSection.innerHTML = "<p>No hay abonos disponibles.</p>";
          }

          for (const pass of passes) {
               
               const passEndDate = new Date(pass.endDatePass);
               const passStartDate = new Date(pass.startDatePass);

               const nowDate = new Date();

               if (passEndDate.getTime() > nowDate.getTime()) {

                    // Prepara datos adaptados para render
                    const extendedPass = {
                         ...pass,
                         startDateFormatted: dateFormat(passStartDate).date,
                         startTimeFormatted: dateFormat(passStartDate).time,
                         endDateFormatted: dateFormat(passEndDate).date
                    };
                    const passContainer = document.createElement('div');
                    passContainer.innerHTML = itemDetails(extendedPass, keyMapPass);
                    const button = await actionButton('solicitar', route.url, passContainer)
                    passesContainer.appendChild(passContainer);

                    const newRoute = {url: route + pass.name}

                    button.addEventListener('click', (e) => {
                       
                         navigate(e, newRoute);
                       
                    });

               }

            

          };

          eventsSection.appendChild(passesContainer);
          console.log(passesContainer);


     } catch (error) {
       
          renderRegisterLoginPage();
     }

}