import { Link, useParams } from 'react-router-dom'
import ComprarProducto from '../components/ComprarProducto'
import ListaProductos from '../components/ListaProductos'
import { obtenerProductoPorId, obtenerProductosPorCategoria } from '../data/productosService'
import { formatoPrecio } from '../utils/formato'

export default function DetalleProducto() {
    const { id } = useParams()
    const producto = obtenerProductoPorId(id)

    if (!producto) {
        return (
            <main className="container py-4">
                <p className="text-muted">El producto no existe.</p>
                <Link to="/productos">Volver a productos</Link>
            </main>
        )
    }

    const relacionados = obtenerProductosPorCategoria(producto.categoria)
        .filter((p) => p.id !== producto.id)
        .slice(0, 4)

    return (
        <main className="container py-4">
            <nav className="breadcrumb-nav mb-4">
                <Link to="/">Home</Link> &gt;{' '}
                <Link to={`/categorias/${producto.categoria}`}>{producto.categoria}</Link> &gt;{' '}
                <span>{producto.nombre}</span>
            </nav>

            <section className="product-detail-wrapper">
                <div className="product-gallery">
                    <div className="main-image-container">
                        <img src={producto.imagen} alt={producto.nombre} />
                    </div>
                </div>

                <div className="product-info-panel">
                    <div className="product-header">
                        <h1 className="detail-title">{producto.nombre}</h1>
                        <div className="text-end">
                            {producto.descuento > 0 && (
                                <span className="badge text-bg-danger me-2">-{producto.descuento}%</span>
                            )}
                            <span className="detail-price">{formatoPrecio(producto.precio)}</span>
                            {producto.precioOriginal && (
                                <div><s className="text-muted">{formatoPrecio(producto.precioOriginal)}</s></div>
                            )}
                        </div>
                    </div>

                    <p className="detail-description">{producto.descripcion}</p>

                    {/* key: al cambiar de producto se reinicia la cantidad */}
                    <ComprarProducto key={producto.id} producto={producto} />
                </div>
            </section>

            <hr className="my-5" />

            <section>
                <h3 className="mb-4">Productos Relacionados</h3>
                <ListaProductos
                    productos={relacionados}
                    mensajeVacio="No hay productos relacionados."
                />
            </section>
        </main>
    )
}
