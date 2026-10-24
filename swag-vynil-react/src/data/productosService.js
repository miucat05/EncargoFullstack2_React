import productos from "./productos";
import { descuentos } from './ofertas-data'

export function obtenerCategorias() {
    const nombres = [...new Set(productos.map((p) => p.categoria))]

    return nombres.map((nombre) => {
        const delaCategoria = productos.filter((p) => p.categoria === nombre)
        return {
            nombre,
            cantidad: delaCategoria.length,
            imagen: delaCategoria[0].imagen,
        }
    })
}

export function obtenerProductosPorCategoria(nombre) {
    return productos.filter((p) => p.categoria === nombre)
}

export function obtenerOfertas(){
    return productos
        .filter((p) => descuentos[p.id])
        .map((p) => ({
            ...p,
            precioOriginal: p.precio,
            precio: Math.round(p.precio * (1 - descuentos[p.id] / 100)),
            descuento: descuentos[p.id],
        }))
}