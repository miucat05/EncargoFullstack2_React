import { apiFetch } from './cliente'

// Lectura pública: no envía token
export function listarCategoriasApi() {
  return apiFetch('/api/v1/categorias', { auth: false })
}

export function obtenerCategoriaApi(id) {
  return apiFetch(`/api/v1/categorias/${id}`, { auth: false })
}

// Escritura: solo Administrador (apiFetch agrega el token de la sesión)
export function crearCategoriaApi({ nombre, descripcion }) {
  return apiFetch('/api/v1/categorias', {
    method: 'POST',
    body: { nombre, descripcion },
  })
}

export function actualizarCategoriaApi(id, { nombre, descripcion }) {
  return apiFetch(`/api/v1/categorias/${id}`, {
    method: 'PUT',
    body: { nombre, descripcion },
  })
}

export function eliminarCategoriaApi(id) {
  return apiFetch(`/api/v1/categorias/${id}`, { method: 'DELETE' })
}
