import { apiFetch } from './cliente'

const ESTADOS = {
  PENDIENTE: 'Pendiente',
  COMPLETADA: 'Completada',
  FALLIDA: 'Fallida',
}

// Backend -> la forma de "orden" que ya usan las pantallas
function aOrden(b) {
  return {
    id: b.id,
    usuarioId: b.usuarioId,
    runUsuario: b.run,
    cliente: b.cliente,
    correo: b.correo,
    fecha: b.fecha.slice(0, 10), // AAAA-MM-DD
    estado: ESTADOS[b.estado] ?? b.estado,
    metodoPago: b.metodoPago,
    productos: b.detalles.map((d) => ({
      nombre: d.nombre,
      cantidad: d.cantidad,
      precio: d.precioUnitario,
      imagen: d.imagen,
    })),
    entrega: {
      calle: b.calle,
      departamento: b.departamento,
      region: b.region,
      comuna: b.comuna,
      indicaciones: b.indicaciones,
    },
  }
}

export async function crearBoletaApi(datos) {
  return aOrden(await apiFetch('/api/v1/boletas', { method: 'POST', body: datos }))
}

export async function obtenerBoletaApi(id) {
  return aOrden(await apiFetch(`/api/v1/boletas/${id}`))
}

// Administrador y Vendedor
export async function listarBoletasApi() {
  const lista = await apiFetch('/api/v1/boletas')
  return lista.map(aOrden)
}

// Historial de un usuario (solo Administrador)
export async function boletasDeUsuarioApi(usuarioId) {
  const lista = await apiFetch(`/api/v1/boletas/usuario/${usuarioId}`)
  return lista.map(aOrden)
}