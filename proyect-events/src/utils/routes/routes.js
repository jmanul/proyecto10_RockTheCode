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