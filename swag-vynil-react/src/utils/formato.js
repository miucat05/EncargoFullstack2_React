export function formatoPrecio(precio) {
    return precio.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    })
}

export function claseEstado(estado) {
  if (estado === 'Completada') return 'text-bg-success'
  if (estado === 'Fallida') return 'text-bg-danger'
  return 'text-bg-warning'
}