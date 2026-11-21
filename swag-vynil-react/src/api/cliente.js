const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
const CLAVE_SESION = 'sesion'

export class ApiError extends Error {
  constructor(mensaje, status) {
    super(mensaje)
    this.status = status
  }
}

function obtenerToken() {
  try {
    const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION))
    return sesion?.token ?? null
  } catch {
    return null
  }
}

export async function apiFetch(ruta, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const token = obtenerToken()
  if (auth && token) headers.Authorization = `Bearer ${token}`

  let respuesta
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('No se pudo conectar con el servidor', 0)
  }

  if (respuesta.status === 204) return null

  let datos = null
  try {
    datos = await respuesta.json()
  } catch {
    datos = null
  }

    if (!respuesta.ok) {
    // Token rechazado por el backend: se cierra la sesión y se vuelve al login
    if (respuesta.status === 401 && auth && token) {
      localStorage.removeItem(CLAVE_SESION)
      window.location.href = '/login'
    }
    const mensaje = datos?.message || datos?.detail || 'Ocurrió un error en la solicitud'
    throw new ApiError(mensaje, respuesta.status)
  }
  return datos
}