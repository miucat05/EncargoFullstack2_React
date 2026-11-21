import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { obtenerCategorias } from '../data/productosService'
import { formatoPrecio } from '../utils/formato'

function EnlaceNav({ to, end, children }) {
    return (
        <li className="nav-item">
            <NavLink to={to} end={end} className="nav-link">
                {children}
            </NavLink>
        </li>
    )
}

function Navbar() {
    const navigate = useNavigate()
    const { total } = useCarrito()
    const [texto, setTexto] = useState('')
    const categorias = obtenerCategorias()

    const buscar = (e) => {
        e.preventDefault()
        const consulta = texto.trim()
        navigate(consulta ? `/productos?buscar=${encodeURIComponent(consulta)}` : '/productos')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <img src="/images/logoswag.png" alt="Logo Swag Vynil" style={{ height: 40 }} />
                    Swag Vynil
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuTienda"
                    aria-controls="menuTienda"
                    aria-expanded="false"
                    aria-label="Abrir menú"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menuTienda">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <EnlaceNav to="/" end>Home</EnlaceNav>
                        <EnlaceNav to="/productos">Productos</EnlaceNav>

                        <li className="nav-item dropdown">
                            <button
                                type="button"
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Categorías
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/categorias">
                                        Todas las categorías
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                {categorias.map((categoria) => (
                                    <li key={categoria.nombre}>
                                        <Link
                                            className="dropdown-item"
                                            to={`/categorias/${categoria.nombre}`}
                                        >
                                            {categoria.nombre}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <EnlaceNav to="/ofertas">Ofertas</EnlaceNav>
                        <EnlaceNav to="/nosotros">Nosotros</EnlaceNav>
                        <EnlaceNav to="/blog">Blog</EnlaceNav>
                        <EnlaceNav to="/contacto">Contacto</EnlaceNav>
                    </ul>

                    <form className="d-flex my-2 my-lg-0 me-lg-3" role="search" onSubmit={buscar}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Buscar"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>

                    <Link to="/carrito" className="btn btn-success me-lg-3 mb-2 mb-lg-0">
                        🛒 Carrito {formatoPrecio(total)}
                    </Link>

                    <div className="d-flex gap-2">
                        <Link className="btn btn-outline-primary btn-sm" to="/login">Iniciar sesión</Link>
                        <Link className="btn btn-primary btn-sm" to="/registro">Crear cuenta</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar