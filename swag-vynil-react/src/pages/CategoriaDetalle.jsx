import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { listarProductosApi } from '../api/productosApi'

export default function CategoriaDetalle() {
    const { categoria } = useParams()
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        setCargando(true)
        listarProductosApi(categoria)
            .then((lista) => {
                setProductos(lista)
                setError('')
            })
            .catch((e) => setError(e.message || 'No se pudieron cargar los productos.'))
            .finally(() => setCargando(false))
    }, [categoria])

    return (
        <main className='container py-4'>
            <nav className='breadcrumb-nav mb-3'>
                <Link to="/categorias">Categorías</Link> / {categoria}
            </nav>

            <h1 className='h3 mb-3'>{categoria}</h1>

            {error && <div className='alert alert-danger'>{error}</div>}

            {cargando ? (
                <p className='text-muted'>Cargando productos...</p>
            ) : productos.length === 0 ? (
                <p className='text-muted'>No hay productos en esta categoría.</p>
            ) : (
                <div className='productos-grid'>
                    {productos.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </main>
    )
}