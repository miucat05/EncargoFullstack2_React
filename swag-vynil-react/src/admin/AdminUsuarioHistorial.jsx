import { Link, useParams } from 'react-router-dom'
import { buscarUsuarioPorRun } from '../data/usuariosService'
import { obtenerOrdenesPorUsuario, calcularTotalOrden } from '../data/ordenes'
import { formatoPrecio } from '../utils/formato'

export default function AdminUsuarioHistorial() {
  const { run } = useParams()
  const usuario = buscarUsuarioPorRun(run)

  if (!usuario) {
    return (
      <div>
        <h1 className="h3 mb-3">Usuario no encontrado</h1>
        <Link to="/admin/usuarios" className="btn btn-outline-secondary">
          Volver al listado
        </Link>
      </div>
    )
  }

  const ordenes = obtenerOrdenesPorUsuario(run)
  const totalComprado = ordenes
    .filter((orden) => orden.estado === 'Completada')
    .reduce((suma, orden) => suma + calcularTotalOrden(orden), 0)

  return (
    <div>
      <nav className="breadcrumb-nav mb-3">
        <Link to="/admin/usuarios">Usuarios</Link> / Historial de compras
      </nav>

      <h1 className="h3 mb-1">Historial de compras</h1>
      <p className="text-muted">
        {usuario.nombre} {usuario.apellidos} · {usuario.correo}
      </p>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Órdenes</p>
              <h3 className="fw-bold">{ordenes.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Total comprado (completadas)</p>
              <h3 className="fw-bold">{formatoPrecio(totalComprado)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive bg-white rounded shadow-sm">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>N.º orden</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th className="text-end">Boleta</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>#{orden.id}</td>
                <td>{orden.fecha}</td>
                <td>{orden.productos.length}</td>
                <td>{formatoPrecio(calcularTotalOrden(orden))}</td>
                <td>
                  <span
                    className={`badge ${
                      orden.estado === 'Completada' ? 'text-bg-success' : 'text-bg-warning'
                    }`}
                  >
                    {orden.estado}
                  </span>
                </td>
                <td className="text-end">
                  <Link
                    to={`/admin/ordenes/${orden.id}/boleta`}
                    className="btn btn-sm btn-outline-dark"
                  >
                    Ver boleta
                  </Link>
                </td>
              </tr>
            ))}

            {ordenes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  Este usuario todavía no tiene compras.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}