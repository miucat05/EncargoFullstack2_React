import productos from "./productos";

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