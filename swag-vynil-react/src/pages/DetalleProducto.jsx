import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ComprarProducto from '../components/ComprarProducto'
import ListaProductos from '../components/ListaProductos'
import { obtenerProductoApi, listarProductosApi } from '../api/productosApi'
import { formatoPrecio } from '../utils/formato'

export default function DetalleProducto() {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [relacionados, setRelacionados] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        let activo = true
        setCargando(true)

        obtenerProductoApi(id)
            .then(async (p) => {
                // otros productos de la misma categoría
                const mismos = await listarProductosApi(p.categoria).catch(() => [])
                if (!activo) return
                setProducto(p)
                setRelacionados(mismos.filter((x) => x.id !== p.id).slice(0, 4))
            })
            .catch(() => {
                if (activo) setProducto(null)
            })
            .finally(() => {
                if (activo) setCargando(false)
            })

        return () => {
            activo = false
        }
    }, [id])

    if (cargando) {
        return (
            <main className="container py-4">
                <p className="text-muted">Cargando producto...</p>
            </main>
        )
    }

    if (!producto) {
        return (
            <main className="container py-4">
                <p className="text-muted">El producto no existe.</p>
                <Link to="/productos">Volver a productos</Link>
            </main>
        )
    }

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