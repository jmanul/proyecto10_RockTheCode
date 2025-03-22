import { renderEventsPage } from "../../pages/events";

export const routes = [
     { id: 'eventos', name: 'Eventos', action: renderEventsPage, icon: 'events.svg', url: '/events' }, { id: 'perfil', name: 'Perfil', action: '', icon: 'perfil.svg', url: '/you' }, { id: 'usuarios', name: 'Usuarios', action: '', icon: 'usuarios.svg' }, { id: 'salir', name: 'Salir', action: '', icon: 'salir.svg', url: '/exit' }
];

export const typesEventsRoutes = [
     {
          id: "musica",
          name: "musica",
          action: "",
          url: "/events/musica"
     },
     {
          id: "deporte",
          name: "Deporte",
          action: "",
          url: "/events/deporte"
     },
     {
          id: "fiesta",
          name: "Fiesta",
          action: "",
          url: "/events/fiesta"
     },
     {
          id: "formacion",
          name: "Formación",
          action: "",
          url: "/events/formacion"
     },
     {
          id: "arte",
          name: "Arte",
          action: "",
          url: "/events/arte"
     },
     {
          id: "gastronomia",
          name: "Gastronomía",
          action: "",
          url: "/events/gastronomia"
     },
     {
          id: "tecnologia",
          name: "Tecnología",
          action: "",
          url: "/events/tecnologia"
     },
     {
          id: "otros",
          name: "Otros",
          action: "",
          url: "/events/otros"
     }
];