import { renderEventsPage } from "../../pages/events";
import { renderRegisterLoginPage } from "../../pages/registerLogin";

export const adminRoutes = [
     { id: 'eventos', name: 'Eventos', action: renderEventsPage, icon: 'events-list.svg', url: '/events' }, { id: 'perfil', name: 'Perfil', action: '', icon: 'perfil.svg', url: '/users/user' }, { id: 'usuarios', name: 'Usuarios', action: '', icon: 'usuarios.svg', url: '/users' }, { id: 'salir', name: 'Salir', action: '', icon: 'salir.svg', url: '/logout' }
];

export const userRoutes = [
     { id: 'crear', name: 'Crear', action: '', icon: 'events.svg', url: '/events/new' }, { id: 'perfil', name: 'Perfil', action: '', icon: 'perfil.svg', url: '/users/user' }, { id: 'entradas', name: 'entradas', action: '', icon: 'entrada.svg', url: '/passes' }, { id: 'salir', name: 'Salir', action: '', icon: 'salir.svg', url: '/logout' }
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