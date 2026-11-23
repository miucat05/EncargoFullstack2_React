import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { formatoPrecio } from '../utils/formato'

export default function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar, total } = useCarrito()

  if (items.length === 0) {
    return (
      <main className="container py-5 text-center">
        <h1 className="h3 mb-3">Tu carrito está vacío</h1>
        <p className="text-muted">Agrega algunos vinilos para comenzar tu compra.</p>
        <Link to="/productos" className="btn btn-primary">Ver productos</Link>
      </main>
    )
  }

  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Carrito de compras</h1>

      <div className="table-responsive bg-white rounded shadow-sm mb-3">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th className="text-end">Precio</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Subtotal</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    width="60"
                    height="60"
                    className="rounded"
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td>{item.nombre}</td>
                <td className="text-end">{formatoPrecio(item.precio)}</td>
                <td className="text-center">
                  <div className="d-inline-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      aria-label={`Quitar una unidad de ${item.nombre}`}
                      onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                    >
                      −
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      aria-label={`Agregar una unidad de ${item.nombre}`}
                      onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-end">{formatoPrecio(item.precio * item.cantidad )}</td>
                <td className="text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => quitar(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="4" className="text-end">Total</th>
              <th className="text-end">{formatoPrecio(total)}</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={vaciar}>
          Vaciar carrito
        </button>
        <Link to="/checkout" className="btn btn-success">Comprar ahora</Link>
      </div>
    </main>
  )
}