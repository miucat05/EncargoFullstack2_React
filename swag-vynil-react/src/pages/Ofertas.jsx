import ProductCard from '../components/ProductCard'
import productos from '../data/productos'
import { obtenerOfertas } from '../data/productosService'

export default function Ofertas() {
    const ofertas = obtenerOfertas()

    return (
        <main className='container py-4'>
            <h1 className='h3 mb-1'>Ofertas</h1>
            <p className='text-muted'>Vinilos con descuento por tiempo limitado.</p>

            {ofertas.length === 0 ? (
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