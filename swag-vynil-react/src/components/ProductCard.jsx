import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function ProductCard({ producto }) {
    const { agregar } = useCarrito()

    return (
        <article className="product-card">
            <img src={producto.imagen} alt={producto.nombre} />
            <Link to={`/productos/${producto.id}`} className="product-title">
                {producto.nombre}
            </Link>
            {producto.descuento && (
                <span className="badge text-bg-danger mb-1">-{producto.descuento}%</span>
            )}
            <p className="product-price">
                {producto.precioOriginal && (
                    <s className="text-muted me-2">
                        ${producto.precioOriginal.toLocaleString('es-CL')}
                    </s>
                )}
                ${producto.precio.toLocaleString('es-CL')}
            </p>
            <button
                type="button"
                className="btn-add-cart"
                onClick={() => agregar(producto)}
            >
                Añadir
            </button>
        </article>
    );
}

export default ProductCard;