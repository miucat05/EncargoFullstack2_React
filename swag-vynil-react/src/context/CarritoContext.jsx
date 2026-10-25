import { createContext, useContext, useEffect, useState } from 'react'

const CLAVE = 'carrito'
const CarritoContext = createContext(null)

function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || []
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(cargarCarrito)

  // cada vez que cambia el carrito se guarda en localStorage
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items))
  }, [items])

  // producto.precio ya trae el precio de oferta si corresponde
  const agregar = (producto, cantidad = 1) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id)
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id ? { ...i, cantidad: i.cantidad + cantidad } : i
        )
      }
      const { id, nombre, precio, imagen } = producto
      return [...prev, { id, nombre, precio, imagen, cantidad }]
    })
  }

  const quitar = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) {
      quitar(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)))
  }

  const vaciar = () => setItems([])

  const total = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0)
  const cantidadTotal = items.reduce((suma, i) => suma + i.cantidad, 0)

  const valor = { items, agregar, quitar, cambiarCantidad, vaciar, total, cantidadTotal }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  }
  return contexto
}