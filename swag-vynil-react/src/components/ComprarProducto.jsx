import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'

// Selector de cantidad + botón "Añadir al carrito" de la página de detalle.
export default function ComprarProducto({ producto }) {
    const { agregar } = useCarrito()
    const [cantidad, setCantidad] = useState(1)
    const [agregado, setAgregado] = useState(false)

    const cambiarCantidad = (e) => {
        setCantidad(Number(e.target.value))
        setAgregado(false)
    }

    const anadir = () => {
        agregar(producto, cantidad)
        setAgregado(true)
    }

    return (
        <div className="purchase-actions">
            <div className="quantity-selector">
                <label htmlFor="cantidad">Cantidad</label>
                <select id="cantidad" value={cantidad} onChange={cambiarCantidad}>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>

            <button type="button" className="btn-add-cart-detail" onClick={anadir}>
                Añadir al carrito
            </button>

            {agregado && (
                <div className="alert alert-success py-2 mb-0" role="alert">
                    {cantidad} × {producto.nombre} agregado al carrito.
                </div>
            )}
        </div>
    )
}