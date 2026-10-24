
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  obtenerOrdenes,
  calcularTotalOrden,
} from '../data/ordenes'

export default function AdminOrdenes() {
  const [ordenes] = useState(() => obtenerOrdenes())
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todas')

  const ordenesFiltradas = ordenes.filter((orden) => {
    const coincideBusqueda =
      orden.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      String(orden.id).includes(busqueda)

    const coincideEstado =
      filtroEstado === 'Todas' || orden.estado === filtroEstado

    return coincideBusqueda && coincideEstado
  })

  const formatoPrecio = (precio) =>
    precio.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    })

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Gestión de órdenes</h2>
        <p className="text-muted">
          Consulta las órdenes de compra y revisa sus boletas.
        </p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Total de órdenes</p>
              <h3 className="fw-bold">{ordenes.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Pendientes</p>
              <h3 className="fw-bold">
                {ordenes.filter((orden) => orden.estado === 'Pendiente').length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-1">Completadas</p>
              <h3 className="fw-bold">
                {ordenes.filter((orden) => orden.estado === 'Completada').length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="row g-3 mb-3">
            <div className="col-md-7">
              <label htmlFor="buscarOrden" className="form-label">
                Buscar orden
              </label>
              <input
                id="buscarOrden"
                type="text"
                className="form-control"
                placeholder="Buscar por cliente o número..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="filtroEstado" className="form-label">
                Filtrar por estado
              </label>
              <select
                id="filtroEstado"
                className="form-select"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>N.º orden</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Pago</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {ordenesFiltradas.map((orden) => (
                  <tr key={orden.id}>
                    <td>#{orden.id}</td>
                    <td>{orden.cliente}</td>
                    <td>{orden.fecha}</td>
                    <td>{formatoPrecio(calcularTotalOrden(orden))}</td>
                    <td>
                      <span
                        className={`badge ${
                          orden.estado === 'Completada'
                            ? 'text-bg-success'
                            : 'text-bg-warning'
                        }`}
                      >
                        {orden.estado}
                      </span>
                    </td>
                    <td>{orden.metodoPago}</td>
                    <td>
                      <Link
                        to={`/admin/ordenes/${orden.id}/boleta`}
                        className="btn btn-sm btn-outline-dark"
                      >
                        Ver boleta
                      </Link>
                    </td>
                  </tr>
                ))}

                {ordenesFiltradas.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No se encontraron órdenes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
