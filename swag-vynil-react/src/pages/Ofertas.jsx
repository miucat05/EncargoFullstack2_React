import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { listarOfertasApi } from '../api/productosApi'

export default function Ofertas() {
    const [ofertas, setOfertas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        listarOfertasApi()
            .then(setOfertas)
            .catch((e) => setError(e.message || 'No se pudieron cargar las ofertas.'))
            .finally(() => setCargando(false))
    }, [])

    return (
        <main className='container py-4'>
            <h1 className='h3 mb-1'>Ofertas</h1>
            <p className='text-muted'>Vinilos con descuento por tiempo limitado.</p>

            {error && <div className='alert alert-danger'>{error}</div>}

            {cargando ? (
                <p className='text-muted'>Cargando ofertas...</p>
            ) : ofertas.length === 0 ? (
                <p className='text-muted'>No hay ofertas disponibles por ahora.</p>
            ) : (
                <div className='productos-grid'>
                    {ofertas.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </main>
    )
}