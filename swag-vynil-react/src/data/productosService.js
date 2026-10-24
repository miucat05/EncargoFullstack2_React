import productos from './productos'
import { descuentos } from './ofertas-data'

// Aplica el descuento (si existe) a un producto
function conOferta(producto) {
  const descuento = descuentos[producto.id]
  if (!descuento) return producto

  return {
    ...producto,
    precioOriginal: producto.precio,
    precio: Math.round(producto.precio * (1 - descuento / 100)),
    descuento,
  }
}

// Todos los productos con su precio de oferta si corresponde
export function obtenerProductos() {
  return productos.map(conOferta)
}

export function obtenerProductoPorId(id) {
  return obtenerProductos().find((p) => p.id === Number(id))
}

export function obtenerOfertas() {
  return obtenerProductos().filter((p) => p.descuento)
}

// Categorías únicas, con cuántos productos tiene cada una y una imagen de portada
export function obtenerCategorias() {
  const todos = obtenerProductos()
  const nombres = [...new Set(todos.map((p) => p.categoria))]

  return nombres.map((nombre) => {
    const delaCategoria = todos.filter((p) => p.categoria === nombre)
    return { nombre, cantidad: delaCategoria.length, imagen: delaCategoria[0].imagen }
  })
}

export function obtenerProductosPorCategoria(nombre) {
  return obtenerProductos().filter((p) => p.categoria === nombre)
}