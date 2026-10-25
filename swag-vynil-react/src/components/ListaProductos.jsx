import ProductCard from './ProductCard'

// Muestra una grilla de productos, o un mensaje si la lista viene vacía.
export default function ListaProductos({ productos, mensajeVacio = 'No hay productos para mostrar.' }) {
    if (productos.length === 0) {
        return <p className="text-muted text-center">{mensajeVacio}</p>
    }

    return (
        <div className="productos-grid">
            {productos.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
            ))}
        </div>
    )
}