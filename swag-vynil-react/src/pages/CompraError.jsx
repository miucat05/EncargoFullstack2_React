import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DetalleCompra from '../components/DetalleCompra'
import { obtenerBoletaApi } from '../api/boletasApi'

export default function CompraError() {
  const { id } = useParams()
  const [orden, setOrden] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerBoletaApi(id)
      .then(setOrden)
      .catch(() => setOrden(null))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) {
    return <main className="container py-5 text-center">Cargando compra...</main>
  }

  if (!orden || orden.estado !== 'Fallida') {
    return (
      <main className='container py-5 text-center'>
        <h1 className='h3 mb-3'>Compra no encontrada</h1>
        <Link to="/" className='btn btn-primary'>Volver al inicio</Link>
      </main>
    )
  }

  return (
    <main className="container py-4">
      <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ maxWidth: 760 }}>
        <h1 className="h4 text-danger mb-1">No se pudo realizar el pago. Nro #{orden.id}</h1>
        <p className="text-muted">Detalle de la compra</p>

        <DetalleCompra orden={orden} etiquetaTotal="Total a pagar" />

        <div className="d-flex justify-content-center mt-4">
          <Link to="/checkout" className="btn btn-success">Volver a realizar el pago</Link>
        </div>
      </div>
    </main>
  )
}