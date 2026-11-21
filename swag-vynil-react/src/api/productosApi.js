import { apiFetch } from './cliente'

// Frontend -> backend: envía solo los campos que la API espera
function aBackend(d) {
  return {
    nombre: d.nombre,
    descripcion: d.descripcion,
    precio: Number(d.precio), // precio base, sin descuento
    imagen: d.imagen,
    descuento: Number(d.descuento || 0),
    stock: Number(d.stock),
    stockCritico: Number(d.stockCritico),
    categoriaId: Number(d.categoriaId),
  }
}

// Lectura pública: no envía token
export function listarProductosApi(categoria) {
  const consulta = categoria ? `?categoria=${encodeURIComponent(categoria)}` : ''
  return apiFetch(`/api/v1/productos${consulta}`, { auth: false })
}

export function listarOfertasApi() {
  return apiFetch('/api/v1/productos/ofertas', { auth: false })
}

export function obtenerProductoApi(id) {
  return apiFetch(`/api/v1/productos/${id}`, { auth: false })
}

// Escritura: solo Administrador (apiFetch agrega el token de la sesión)
export function crearProductoApi(datos) {
  return apiFetch('/api/v1/productos', { method: 'POST', body: aBackend(datos) })
}

export function actualizarProductoApi(id, datos) {
  return apiFetch(`/api/v1/productos/${id}`, { method: 'PUT', body: aBackend(datos) })
}

export function eliminarProductoApi(id) {
  return apiFetch(`/api/v1/productos/${id}`, { method: 'DELETE' })
}