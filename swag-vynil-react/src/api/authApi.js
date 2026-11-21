import { apiFetch } from './cliente'

export function loginApi(correo, contrasena) {
  return apiFetch('/api/v1/auth/login', {
    method: 'POST',
    body: { correo, contrasena },
    auth: false,
  })
}

export function registroApi(datos) {
  return apiFetch('/api/v1/auth/register', {
    method: 'POST',
    body: datos,
    auth: false,
  })
}