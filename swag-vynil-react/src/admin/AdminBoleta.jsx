
import { Link, useParams } from 'react-router-dom'
import {
  obtenerOrdenPorId,
  calcularTotalOrden,
} from '../data/ordenes'

export default function AdminBoleta() {
  const { id } = useParams()
  const orden = obtenerOrdenPorId(id)

  const formatoPrecio = (precio) =>
    precio.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    })

  if (!orden) {
    return (
      <div className="container py-4">
        <h2>Orden no encontrada</h2>
        <p className="text-muted">
          No encontramos una orden con ese número.
        </p>
        <Link to="/admin/ordenes" className="btn btn-dark">
          Volver a órdenes
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Detalle de boleta</h2>
          <p className="text-muted mb-0">Orden #{orden.id}</p>
        </div>

        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => window.print()}
        >
          Imprimir boleta
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold">SWAG VYNIL</h3>
            <p className="text-muted mb-0">Boleta de compra</p>
          </div>

          <hr />

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <strong>Número de orden:</strong>
              <p>#{orden.id}</p>
            </div>

            <div className="col-md-6">
              <strong>Fecha:</strong>
              <p>{orden.fecha}</p>
            </div>

            <div className="col-md-6">
              <strong>Cliente:</strong>
              <p>{orden.cliente}</p>
            </div>

            <div className="col-md-6">
              <strong>Método de pago:</strong>
              <p>{orden.metodoPago}</p>
            </div>

            <div className="col-md-6">
              <strong>Estado:</strong>
              <p>{orden.estado}</p>
            </div>
          </div>

          <h5 className="fw-bold mb-3">Productos comprados</h5>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Precio unitario</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {orden.productos.map((producto, indice) => (
                  <tr key={`${producto.nombre}-${indice}`}>
                    <td>{producto.nombre}</td>
                    <td className="text-center">{producto.cantidad}</td>
                    <td className="text-end">
                      {formatoPrecio(producto.precio)}
                    </td>
                    <td className="text-end">
                      {formatoPrecio(producto.precio * producto.cantidad)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <div className="text-end">
              <span className="text-muted">Total de la compra</span>
              <h3 className="fw-bold">
                {formatoPrecio(calcularTotalOrden(orden))}
              </h3>
            </div>
          </div>

          <hr />

          <p className="text-center text-muted mb-0">
            Gracias por comprar en Swag Vynil.
          </p>
        </div>
      </div>

      <div className="mt-3">
        <Link to="/admin/ordenes" className="btn btn-dark">
          Volver a órdenes
        </Link>
      </div>
    </div>
  )
}
