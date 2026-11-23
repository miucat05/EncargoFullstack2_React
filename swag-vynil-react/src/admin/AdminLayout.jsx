import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { cerrarSesion, obtenerSesion } from '../data/usuariosService'

const TODOS = ['ADMINISTRADOR', 'VENDEDOR']
const SOLO_ADMIN = ['ADMINISTRADOR']

const enlaces = [
    { to: '/admin', texto: 'Dashboard', end: true, roles: SOLO_ADMIN },
    { to: '/admin/ordenes', texto: 'Órdenes', roles: TODOS },
    { to: '/admin/productos', texto: 'Productos', roles: TODOS },
    { to: '/admin/categorias', texto: 'Categorías', roles: SOLO_ADMIN },
    { to: '/admin/usuarios', texto: 'Usuarios', roles: SOLO_ADMIN },
    { to: '/admin/reportes', texto: 'Reportes', roles: SOLO_ADMIN },
    { to: '/admin/perfil', texto: 'Perfil', roles: SOLO_ADMIN },
]

export default function AdminLayout() {
    const navigate = useNavigate()

    const sesion = obtenerSesion()
    const visibles = enlaces.filter((e) => e.roles.includes(sesion?.rol))

    const salir = () => {
        cerrarSesion()
        navigate('/login')
    }

    return (
        <div className="d-flex min-vh-100">
            <aside className="bg-light border-end p-3" style={{ width: 220 }}>
                <h6 className="text-muted mb-3">Swag Vynil Admin</h6>

                <ul className="nav nav-pills flex-column gap-1">
                    {visibles.map((enlace) => (
                        <li className="nav-item" key={enlace.to}>
                            <NavLink to={enlace.to} end={enlace.end} className="nav-link">
                                {enlace.texto}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <hr />

                <NavLink to="/" className="btn btn-dark w-100 mb-2">Tienda</NavLink>
                <button type="button" className="btn btn-danger w-100" onClick={salir}>
                    Cerrar sesión
                </button>
            </aside>

            <main className="flex-grow-1 p-4 bg-body-tertiary">
                <Outlet />
            </main>
        </div>
    )
}