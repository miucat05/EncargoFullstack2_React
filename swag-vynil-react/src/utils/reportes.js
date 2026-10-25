import { calcularTotalOrden } from "../data/ordenes";

const completadas = (ordenes) => ordenes.filter((orden) => orden.estado === 'Completada')

export function filtrarPorFecha(ordenes, desde, hasta) {
    return ordenes.filter(
        (orden) => (!desde || orden.fecha >= desde) && (!hasta || orden.fecha <= hasta)
    )
}

export function ventasTotales(ordenes) {
    return completadas(ordenes).reduce((suma, orden) => suma + calcularTotalOrden(orden), 0)
}

export function ticketPromedio(ordenes) {
    const ventas = completadas(ordenes)
    if (ventas.length === 0) return 0
    return Math.round(ventasTotales(ordenes) / ventas.length)
}

export function ordenesPorEstado(ordenes) {
    const conteo = {}
    ordenes.forEach((orden) => {
        conteo[orden.estado] = (conteo[orden.estado] || 0) +1
    })
    return Object.entries(conteo).map(([etiqueta, valor]) => ({etiqueta, valor}))
}

export function productosMasVendidos(ordenes, limite = 5) {
    const unidades = {}
    completadas(ordenes).forEach((orden) => {
        orden.productos.forEach((producto) => {
            unidades[producto.nombre] = (unidades[producto.nombre] || 0) + producto.cantidad
        })
    })

    return Object.entries(unidades)
        .map(([etiqueta, valor]) => ({etiqueta, valor}))
        .sort((a, b) => b.valor - a.valor)
        .slice(0, limite)
}

export function usuariosPorTipo(usuarios) {
    const conteo = {}
    usuarios.forEach((usuario) => {
        conteo[usuario.tipo] = (conteo[usuario.tipo] || 0) +1
    })
    return Object.entries(conteo).map(([etiqueta, valor]) => ({etiqueta, valor}))
}