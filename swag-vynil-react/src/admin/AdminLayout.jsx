import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { cerrarSesion } from '../data/usuariosService'

const enlaces = [
    { to: '/admin', texto: 'Dashboard', end: true },
    { to: '/admin/ordenes', texto: 'Órdenes' },
    { to: '/admin/productos', texto: 'Productos' },
    { to: '/admin/categorias', texto: 'Categorías' },
    { to: '/admin/usuarios', texto: 'Usuarios' },
    { to: '/admin/reportes', texto: 'Reportes' },
    { to: '/admin/perfil', texto: 'Perfil' },
]

export default function AdminLayout() {
    const navigate = useNavigate()

    const salir = () => {
        cerrarSesion()
        navigate('/login')
    }

    return (
        <div className="d-flex min-vh-100">
            <aside className="bg-light border-end p-3" style={{width: 220}}>
                <h6 className="text-muted mb-3">Swag Vynil Admin</h6>

                <ul className="nav nav-pills flex-colum gap-1">
                    {enlaces.map((enlace) =>(
                        <li className="nav-item" key={enlace.to}>
                            <NavLink to = {enlace.to} end= {enlace.end} className="nav-link">
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