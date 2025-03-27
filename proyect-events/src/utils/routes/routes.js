import { renderEventsPage } from "../../pages/events";
import { renderRegisterLoginPage } from "../../pages/registerLogin";
import { logout } from "../logic/logout";

export const adminRoutes = [
     { id: 'perfil', name: 'Perfil', action: '', icon: 'perfil.svg', url: '/users/user' }, { id: 'eventos', name: 'Eventos', action: renderEventsPage, icon: 'events-list.svg', url: '/events' }, { id: 'usuarios', name: 'Usuarios', action: '', icon: 'usuarios.svg', url: '/users' }, { id: 'salir', name: 'Salir', action: logout, icon: 'salir.svg', url: '/register/logout' }
];

export const userRoutes = [{ id: 'perfil', name: 'Perfil', action: '', icon: 'perfil.svg', url: '/users/user' },{ id: 'crear', name: 'Crear', action: '', icon: 'events.svg', url: '/events/new' },  { id: 'entradas', name: 'entradas', action: '', icon: 'entrada.svg', url: '/passes' }, { id: 'salir', name: 'Salir', action: logout, icon: 'salir.svg', url: '/register/logout' }
];

export const loginRoutes = [{
     id: 'entrar', name: 'Entrar', action: renderRegisterLoginPage, icon: 'login.svg', url: '/login' }
];

export const typesEventsRoutes = [
     {
          id: "musica",
          name: "musica",
          action: renderEventsPage,
          url: "/events/type/musica"
     },
     {
          id: "deporte",
          name: "Deporte",
          action: renderEventsPage,
          url: "/events/type/deporte"
     },
     {
          id: "fiesta",
          name: "Fiesta",
          action: renderEventsPage,
          url: "/events/type/fiesta"
     },
     {
          id: "formacion",
          name: "Formación",
          action: renderEventsPage,
          url: "/events/type/formacion"
     },
     {
          id: "arte",
          name: "Arte",
          action: renderEventsPage,
          url: "/events/type/arte"
     },
     {
          id: "gastronomia",
          name: "Gastronomía",
          action: renderEventsPage,
          url: "/events/type/gastronomia"
     },
     {
          id: "tecnologia",
          name: "Tecnología",
          action: renderEventsPage,
          url: "/events/type/tecnologia"
     },
     {
          id: "otros",
          name: "Otros",
          action: renderEventsPage,
          url: "/events/type/otros"
     }
];