

import { createEvent, createEventsPage, eventsUser } from "../../pages/createEvents";
import { renderEvents, eventsPage } from "../../pages/events";
import { oneEventPage } from "../../pages/oneEventPage";
import { renderRegisterLoginPage } from "../../pages/registerLogin";
import { logout } from "../logic/logout";



export const adminRoutes = [
     {
          id: 'perfil',
          name: 'Perfil',
          action: '',
          icon: 'perfil.svg',
          url: '/users/user',
          title: 'Mi perfil - PropoySal',
          description: 'Consulta y edita los datos de tu cuenta como administrador en PropoySal.'
     },
     {
          id: 'eventos',
          name: 'Eventos',
          action: eventsPage,
          icon: 'events-list.svg',
          url: '/events',
          title: 'Eventos disponibles - PropoySal',
          description: 'Explora todos los eventos activos organizados por ti o por otros usuarios.'
     },
     {
          id: 'crear',
          name: 'Crear',
          action: createEventsPage,
          icon: 'events.svg',
          url: '/events/userEventsCreate',
          title: 'Crear evento - PropoySal',
          description: 'Crea un nuevo evento y personalízalo fácilmente desde tu panel de administrador.'
     },
     {
          id: 'usuarios',
          name: 'Usuarios',
          action: '',
          icon: 'usuarios.svg',
          url: '/users',
          title: 'Usuarios registrados - PropoySal',
          description: 'Administra los usuarios registrados en la plataforma PropoySal.'
     },
     {
          id: 'salir',
          name: 'Salir',
          action: logout,
          icon: 'salir.svg',
          url: '/register/logout',
          transitionClass: 'view-transition-form',
          title: 'Cerrar sesión - PropoySal',
          description: 'Has cerrado tu sesión correctamente. ¡Hasta pronto!'
     }
];


export const userRoutes = [
     {
          id: 'perfil',
          name: 'Perfil',
          action: '',
          icon: 'perfil.svg',
          url: '/users/user',
          title: 'Mi perfil - PropoySal',
          description: 'Consulta y edita los datos de tu cuenta en PropoySal.'
     },
     {
          id: 'eventos',
          name: 'Eventos',
          action: eventsPage,
          icon: 'events-list.svg',
          url: '/events',
          title: 'Eventos disponibles - PropoySal',
          description: 'Descubre y participa en los eventos más interesantes cerca de ti.'
     },
     {
          id: 'crear',
          name: 'Crear',
          action: createEventsPage,
          icon: 'events.svg',
          url: '/events/userEventsCreate',
          title: 'Crear eventos - PropoySal',
          description: 'Organiza tu propio evento y compártelo con la comunidad.'
     },
     {
          id: 'entradas',
          name: 'Entradas',
          action: '',
          icon: 'ticket_icon.svg',
          url: '/passes',
          title: 'Mis entradas - PropoySal',
          description: 'Consulta tus entradas para eventos futuros y pasados en PropoySal.'
     },
     {
          id: 'salir',
          name: 'Salir',
          action: logout,
          icon: 'salir.svg',
          url: '/register/logout',
          transitionClass: 'view-transition-form',
          title: 'Cerrar sesión - PropoySal',
          description: 'Has cerrado tu sesión correctamente. ¡Vuelve pronto!'
     }
];


export const loginRoutes = [
     {
          id: 'entrar',
          name: 'Entrar',
          action: renderRegisterLoginPage,
          icon: 'login.svg',
          url: '/login',
          transitionClass: 'view-transition-form',
          title: 'Iniciar sesión o registrarse - PropoySal',
          description: 'Accede a tu cuenta o crea una nueva para disfrutar de eventos únicos.'
     }
];



export const typesEventsRoutes = [
     {
          id: "musica",
          name: "Música",
          action: eventsPage,
          url: "/events/type/musica",
          title: "Eventos de música - PropoySal",
          description: "Descubre conciertos, festivales y eventos musicales en tu ciudad."
     },
     {
          id: "deporte",
          name: "Deporte",
          action: eventsPage,
          url: "/events/type/deporte",
          title: "Eventos deportivos - PropoySal",
          description: "Apúntate a actividades y eventos deportivos para todos los niveles."
     },
     {
          id: "fiesta",
          name: "Fiesta",
          action: eventsPage,
          url: "/events/type/fiesta",
          title: "Fiestas y celebraciones - PropoySal",
          description: "No te pierdas las mejores fiestas y celebraciones cerca de ti."
     },
     {
          id: "formacion",
          name: "Formación",
          action: eventsPage,
          url: "/events/type/formacion",
          title: "Eventos de formación - PropoySal",
          description: "Participa en talleres, cursos y charlas para seguir aprendiendo."
     },
     {
          id: "arte",
          name: "Arte",
          action: eventsPage,
          url: "/events/type/arte",
          title: "Eventos de arte - PropoySal",
          description: "Explora exposiciones, galerías y eventos artísticos en tu zona."
     },
     {
          id: "gastronomia",
          name: "Gastronomía",
          action: eventsPage,
          url: "/events/type/gastronomia",
          title: "Eventos gastronómicos - PropoySal",
          description: "Disfruta de experiencias culinarias, catas y festivales gastronómicos."
     },
     {
          id: "tecnologia",
          name: "Tecnología",
          action: eventsPage,
          url: "/events/type/tecnologia",
          title: "Eventos de tecnología - PropoySal",
          description: "Descubre eventos de innovación, tecnología y emprendimiento digital."
     },
     {
          id: "otros",
          name: "Otros",
          action: eventsPage,
          url: "/events/type/otros",
          title: "Otros eventos - PropoySal",
          description: "Explora eventos variados que no encajan en una sola categoría."
     }
];


export const userEventsRoutes = [
     {
          id: "nuevo-Evento",
          name: "Nuevo Evento",
          action: createEvent,
          url: "/events/",
          transitionClass: 'view-transition-form',
          title: "Nuevo evento - PropoySal",
          description: "Crea un nuevo evento desde cero y compártelo con tu comunidad."
     },
     {
          id: "eventos-Creados",
          name: "Eventos Creados",
          action: eventsUser,
          url: "/events/userEventsCreate/",
          title: "Mis eventos creados - PropoySal",
          description: "Consulta y edita los eventos que has creado como organizador."
     }
];

//todo: tengo que dar una vista a los eventos compartidos
export const dinamicRoutes = [

        {
               action: oneEventPage,
               url: '/events/:id',
               title: "Evento - PropoySal",
               description: "vista del evento"
          }
] 

export const allRoutes = [ ...typesEventsRoutes, ...dinamicRoutes];

