
import { createEvents, createEventsPage, eventsUser } from "../../pages/createEvents";
import { renderEvents, eventsPage } from "../../pages/events";
import { renderRegisterLoginPage } from "../../pages/registerLogin";
import { logout } from "../logic/logout";



export const adminRoutes = [
     { id: 'perfil', name: 'Perfil', action: '', icon: 'perfil.svg', url: '/users/user' }, { id: 'eventos', name: 'Eventos', action: eventsPage, icon: 'events-list.svg', url: '/events' }, { id: 'crear', name: 'Crear', action: createEventsPage, icon: 'events.svg', url: '/events/userEventsCreate' }, { id: 'usuarios', name: 'Usuarios', action: '', icon: 'usuarios.svg', url: '/users' }, { id: 'salir', name: 'Salir', action: logout, icon: 'salir.svg', url: '/register/logout' }
];

export const userRoutes = [{ id: 'perfil', name: 'Perfil', action: '', icon: 'perfil.svg', url: '/users/user' }, { id: 'eventos', name: 'Eventos', action: eventsPage, icon: 'events-list.svg', url: '/events' }, { id: 'crear', name: 'Crear', action: createEventsPage, icon: 'events.svg', url: '/events/userEventsCreate' },  { id: 'entradas', name: 'entradas', action: '', icon: 'ticket_icon.svg', url: '/passes' }, { id: 'salir', name: 'Salir', action: logout, icon: 'salir.svg', url: '/register/logout' }
];

export const loginRoutes = [{
     id: 'entrar', name: 'Entrar', action: renderRegisterLoginPage, icon: 'login.svg', url: '/login' }
];

export const typesEventsRoutes = [
     {
          id: "musica",
          name: "musica",
          action: renderEvents,
          url: "/events/type/musica"
     },
     {
          id: "deporte",
          name: "Deporte",
          action: renderEvents,
          url: "/events/type/deporte"
     },
     {
          id: "fiesta",
          name: "Fiesta",
          action: renderEvents,
          url: "/events/type/fiesta"
     },
     {
          id: "formacion",
          name: "Formación",
          action: renderEvents,
          url: "/events/type/formacion"
     },
     {
          id: "arte",
          name: "Arte",
          action: renderEvents,
          url: "/events/type/arte"
     },
     {
          id: "gastronomia",
          name: "Gastronomía",
          action: renderEvents,
          url: "/events/type/gastronomia"
     },
     {
          id: "tecnologia",
          name: "Tecnología",
          action: renderEvents,
          url: "/events/type/tecnologia"
     },
     {
          id: "otros",
          name: "Otros",
          action: renderEvents,
          url: "/events/type/otros"
     }
];


export const userEventsRoutes = [
     {
          id: "nuevo-Evento",
          name: "Nuevo Evento",
          action: createEvents,
          url: "/events"
     },
     {
          id: "eventos-Creados",
          name: "Eventos Creados",
          action: eventsUser,
          url: "/events/userEventsCreate/"
     }
];
export const allRoutes = [...adminRoutes, ...userRoutes, loginRoutes, ...typesEventsRoutes];