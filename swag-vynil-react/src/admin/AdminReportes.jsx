import { useState } from 'react'
import TarjetaDato from '../components/admin/TarjetaDato'
import GraficoBarras from '../components/admin/GraficoBarras'
import { obtenerOrdenes } from '../data/ordenes'
import { obtenerUsuarios } from '../data/usuariosService'
import { formatoPrecio } from '../utils/formato'
import {
  filtrarPorFecha,
  ventasTotales,
  ticketPromedio,
  ordenesPorEstado,
  productosMasVendidos,
  usuariosPorTipo,
} from '../utils/reportes'

function Seccion({ titulo, children }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h2 className="h5 mb-3">{titulo}</h2>
        {children}
      </div>
    </div>
  )
}

export default function AdminReportes() {
  const [ordenes] = useState(() => obtenerOrdenes())
  const [usuarios] = useState(() => obtenerUsuarios())
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')

  const filtradas = filtrarPorFecha(ordenes, desde, hasta)
  const cantidadCompletadas = filtradas.filter((orden) => orden.estado === 'Completada').length

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 mb-1">Reportes</h1>
        <p className="text-muted mb-0">Resumen de ventas, órdenes y usuarios de la tienda.</p>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-sm-4">
              <label htmlFor="desde" className="form-label">Desde</label>
              <input
                id="desde"
                type="date"
                className="form-control"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <label htmlFor="hasta" className="form-label">Hasta</label>
              <input
                id="hasta"
                type="date"
                className="form-control"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setDesde('')
                  setHasta('')
                }}
              >
                Limpiar filtro
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <TarjetaDato titulo="Ventas totales" valor={formatoPrecio(ventasTotales(filtradas))} />
        </div>
        <div className="col-md-4">
          <TarjetaDato titulo="Órdenes completadas" valor={cantidadCompletadas} />
        </div>
        <div className="col-md-4">
          <TarjetaDato titulo="Ticket promedio" valor={formatoPrecio(ticketPromedio(filtradas))} />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <Seccion titulo="Órdenes por estado">
            <GraficoBarras datos={ordenesPorEstado(filtradas)} />
          </Seccion>
        </div>
        <div className="col-lg-6">
          <Seccion titulo="Productos más vendidos">
            <GraficoBarras datos={productosMasVendidos(filtradas)} claseColor="bg-success" />
          </Seccion>
        </div>
        <div className="col-lg-6">
          <Seccion titulo="Usuarios por tipo">
            <GraficoBarras datos={usuariosPorTipo(usuarios)} claseColor="bg-warning" />
          </Seccion>
        </div>
      </div>
    </div>
  )
}