

export function logout() {
     // Elimina las cookies de forma segura
     Cookies.remove('accessToken', { path: '/', secure: true, sameSite: 'strict' });
     Cookies.remove('refreshToken', { path: '/', secure: true, sameSite: 'strict' });

     // Recarga la página o redirige al inicio de sesión
     window.location.href = '/login';
}


