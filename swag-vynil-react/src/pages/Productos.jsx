import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ListaProductos from '../components/ListaProductos'
import { listarProductosApi } from '../api/productosApi'

export default function Productos() {
    const [params] = useSearchParams()
    const buscar = (params.get('buscar') || '').trim()

    const [todos, setTodos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        listarProductosApi()
            .then(setTodos)
            .catch((e) => setError(e.message || 'No se pudieron cargar los productos.'))
            .finally(() => setCargando(false))
    }, [])

    // la búsqueda del Navbar llega como /productos?buscar=texto
    const productos = todos.filter((p) =>
        `${p.nombre} ${p.categoria}`.toLowerCase().includes(buscar.toLowerCase())
    )

    return (
        <main className="container py-4">
            <h1 className="page-title text-center mb-2">PRODUCTOS</h1>

            {buscar && !cargando && (
                <p className="text-center text-muted">
                    {productos.length} resultado(s) para “{buscar}”
                </p>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {cargando ? (
                <p className="text-center text-muted">Cargando productos...</p>
            ) : (
                <ListaProductos
                    productos={productos}
                    mensajeVacio="No se encontraron productos."
                />
            )}
        </main>
    )
}