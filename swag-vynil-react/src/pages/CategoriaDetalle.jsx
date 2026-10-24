import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { obtenerProductosPorCategoria } from '../data/productosService'


export default function CategoriaDetalle() {
    const { categoria } = useParams()
    const productos = obtenerProductosPorCategoria(categoria)

    return (
        <main className='container py-4'>
            <nav className='breadcrumb-nav mb-3'>
                <Link to="/categorias">Categorías</Link> / {categoria}
            </nav>

            <h1 className='h3 mb-3'>{categoria}</h1>

            {productos.length === 0 ? (
                <p className='text-muted'>No hay productos en esta categoría.</p>
            ):(
                <div className='productos-grid'>
                    {productos.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </main>
    )
}