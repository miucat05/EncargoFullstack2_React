import { Link, useParams } from 'react-router-dom'
import DetalleCompra from '../components/DetalleCompra'
import { obtenerOrdenPorId } from '../data/ordenes'

export default function CompraExitosa() {
    const { id } = useParams()
    const orden = obtenerOrdenPorId(id)

    if (!orden || orden.estado !== 'Completada') {
        return (
            <main className="container py-5 text-center">
                <h1 className="h3 mb-3">Compra no encontrada</h1>
                <Link to="/" className="btn btn-primary">Volver al inicio</Link>
            </main>
        )
    }

    return (
        <main className="container py-4">
            <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ maxWidth: 760 }}>
                <h1 className="h4 text-success mb-1">✔ Se ha realizado la compra. nro #{orden.id}</h1>
                <p className="text-muted">Gracias por comprar en Swag Vynil.</p>

                <DetalleCompra orden={orden} />

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="button" className="btn btn-danger" onClick={() => window.print()}>
                        Imprimir boleta
                    </button>
                    <Link to="/productos" className="btn btn-outline-secondary">Seguir comprando</Link>
                </div>
            </div>
        </main>
    )
}