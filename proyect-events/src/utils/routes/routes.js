import { renderHomePage } from "../../pages/home";

export const routes = [
     { name: 'eventos', action: renderHomePage, icon: 'events.svg', url: '/events' }, { name: 'perfil', action: '', icon: 'perfil.svg', url: '/you' }, { name: 'usuarios', action: '', icon: 'usuarios.svg' }, { name: 'salir', action: '', icon: 'salir.svg', url: '/exit' }
]