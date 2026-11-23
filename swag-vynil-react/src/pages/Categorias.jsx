import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listarCategoriasApi } from '../api/categoriasApi'

export default function Categorias() {
    const [categorias, setCategorias] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        listarCategoriasApi()
            .then(setCategorias)
            .catch((e) => setError(e.message || 'No se pudieron cargar las categorías.'))
            .finally(() => setCargando(false))
    }, [])

    return (
        <main className="container py-4">
            <h1 className="h3 mb-1">Categorías</h1>
            <p className="text-muted">Explora los vinilos por género.</p>

            {error && <div className="alert alert-danger">{error}</div>}
            {cargando && <p className="text-muted">Cargando categorías...</p>}

            <div className="row g-3">
                {categorias.map((categoria) => (
                    <div className="col-6 col-md-4 col-lg-3" key={categoria.id}>
                        <Link
                            to={`/categorias/${categoria.nombre}`}
                            className="card h-100 text-decoration-none shadow-sm"
                        >
                            {categoria.imagen ? (
                                <img
                                    src={categoria.imagen}
                                    alt={categoria.nombre}
                                    className="card-img-top"
                                    style={{ height: 160, objectFit: 'cover' }}
                                />
                            ) : (
                                <div className="bg-light" style={{ height: 160 }} />
                            )}
                            <div className="card-body text-center">
                                <h2 className="h6 mb-1">{categoria.nombre}</h2>
                                <small className="text-muted">{categoria.cantidad} productos</small>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    )
}