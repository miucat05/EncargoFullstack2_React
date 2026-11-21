import ResumenCompra from './ResumenCompra'
import { calcularTotalOrden } from '../data/ordenes'
import { formatoPrecio } from '../utils/formato'

// Cliente, direccio y productos de una orden, lo usan las páginas de resultado del pago
export default function DetalleCompra({ orden, etiquetaTotal = 'Total pagado' }) {
  const entrega = orden.entrega || {}
  const direccion = [
    entrega.calle,
    entrega.departamento && `Depto ${entrega.departamento}`,
    entrega.comuna,
    entrega.region,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <div>
      <dl className="row mb-3">
        <dt className="col-sm-4">Cliente</dt>
        <dd className="col-sm-8">{orden.cliente}</dd>

        {orden.correo && (
          <>
            <dt className="col-sm-4">Correo</dt>
            <dd className="col-sm-8">{orden.correo}</dd>
          </>
        )}

        {direccion && (
          <>
            <dt className="col-sm-4">Dirección de entrega</dt>
            <dd className="col-sm-8">{direccion}</dd>
          </>
        )}

        {entrega.indicaciones && (
          <>
            <dt className="col-sm-4">Indicaciones</dt>
            <dd className="col-sm-8">{entrega.indicaciones}</dd>
          </>
        )}

        <dt className="col-sm-4">Método de pago</dt>
        <dd className="col-sm-8">{orden.metodoPago}</dd>
      </dl>

      <ResumenCompra items={orden.productos} />

      <div className="text-center bg-light rounded p-3 mt-3">
        <strong>{etiquetaTotal}: {formatoPrecio(calcularTotalOrden(orden))}</strong>
      </div>
    </div>
  )
}