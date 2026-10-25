
import productosIniciales from './productos'
import { descuentos } from './ofertas-data'

const CLAVE_PRODUCTOS = 'swag-vynil-productos'

// Carga los productos guardados o utiliza los productos iniciales
function cargarProductosBase() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS)

    if (guardados !== null) {
      const productos = JSON.parse(guardados)
      if (Array.isArray(productos)) return productos
    }
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }

  return [...productosIniciales]
}

// Guarda los productos en el navegador
function guardarProductos(productos) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
}

// Aplica el descuento si existe una oferta para el producto
function conOferta(producto) {
  const descuento = descuentos[producto.id]

  if (!descuento) {
    const { precioOriginal, descuento: descuentoAnterior, ...limpio } = producto
    return limpio
  }

  return {
    ...producto,
    precioOriginal: producto.precioOriginal ?? producto.precio,
    precio: Math.round(
      (producto.precioOriginal ?? producto.precio) * (1 - descuento / 100)
    ),
    descuento,
  }
}

// Obtiene todos los productos, aplicando las ofertas
export function obtenerProductos() {
  return cargarProductosBase().map(conOferta)
}

// Busca un producto por su identificador
export function obtenerProductoPorId(id) {
  return obtenerProductos().find((p) => Number(p.id) === Number(id))
}

// Obtiene los productos que tienen ofertas
export function obtenerOfertas() {
  return obtenerProductos().filter((p) => p.descuento)
}

// Obtiene las categorías con su cantidad de productos e imagen
export function obtenerCategorias() {
  const todos = obtenerProductos()
  const nombres = [...new Set(todos.map((p) => p.categoria))]

  return nombres.map((nombre) => {
    const deLaCategoria = todos.filter((p) => p.categoria === nombre)

    return {
      nombre,
      cantidad: deLaCategoria.length,
      imagen: deLaCategoria[0]?.imagen,
    }
  })
}

// Filtra los productos por categoría
export function obtenerProductosPorCategoria(nombre) {
  return obtenerProductos().filter((p) => p.categoria === nombre)
}

// Crea un producto nuevo
export function crearProducto(datos) {
  const productos = cargarProductosBase()

  const nuevoProducto = {
    ...datos,
    id: Math.max(0, ...productos.map((p) => Number(p.id) || 0)) + 1,
  }

  const actualizados = [...productos, nuevoProducto]
  guardarProductos(actualizados)

  return nuevoProducto
}

// Actualiza un producto existente
export function actualizarProducto(id, cambios) {
  const productos = cargarProductosBase()

  const actualizados = productos.map((producto) =>
    Number(producto.id) === Number(id)
      ? { ...producto, ...cambios, id: producto.id }
      : producto
  )

  guardarProductos(actualizados)
  return actualizados
}

// Elimina un producto
export function eliminarProducto(id) {
  const productos = cargarProductosBase()

  const actualizados = productos.filter(
    (producto) => Number(producto.id) !== Number(id)
  )

  guardarProductos(actualizados)
  return actualizados
}
