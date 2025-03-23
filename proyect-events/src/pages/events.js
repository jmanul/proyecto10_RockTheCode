import { buildFetchJson } from '../api/buildFetch';
import { createEventCard } from '../components/cardEvent';

import './events.css';
import { renderRegisterLoginPage } from './registerLogin';


export async function renderEventsPage() {

     try {

          const eventsSection = document.getElementById('events-section');

          const request = await buildFetchJson({ route: "/events" });

          const events = request.events;

          const eventsContainer = document.createElement("div");
          eventsContainer.classList.add("events-container", "flex-container");

          if (!events || events.length === 0) {
               eventsContainer.innerHTML = "<p>No hay eventos disponibles.</p>";
          } else {
               events.forEach(event => {
                    const eventCard = createEventCard(event);
                    eventsContainer.appendChild(eventCard);
               });
          }

          eventsSection.appendChild(eventsContainer);

     } catch (error) {
         
          renderRegisterLoginPage();
     }

};







