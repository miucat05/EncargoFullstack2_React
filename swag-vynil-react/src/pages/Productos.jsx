import { useSearchParams } from 'react-router-dom'
import ListaProductos from '../components/ListaProductos'
import { obtenerProductos } from '../data/productosService'

export default function Productos() {
    const [params] = useSearchParams()
    const buscar = (params.get('buscar') || '').trim()

    // la búsqueda del Navbar llega como /productos?buscar=texto
    const productos = obtenerProductos().filter((p) =>
        `${p.nombre} ${p.categoria}`.toLowerCase().includes(buscar.toLowerCase())
    )

    return (
        <main className="container py-4">
            <h1 className="page-title text-center mb-2">PRODUCTOS</h1>

            {buscar && (
                <p className="text-center text-muted">
                    {productos.length} resultado(s) para “{buscar}”
                </p>
            )}

            <ListaProductos
                productos={productos}
                mensajeVacio="No se encontraron productos."
            />
        </main>
    )
}