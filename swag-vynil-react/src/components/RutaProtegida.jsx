import { Navigate, Outlet } from 'react-router-dom'
import { obtenerSesion } from '../data/usuariosService'

export default function RutaProtegida({ roles }) {
    const sesion = obtenerSesion()

    if (!sesion) {
        return <Navigate to="/login" replace />
    }

    if (roles && !roles.includes(sesion.rol)) {
        return <Navigate to={sesion.rol === 'VENDEDOR' ? '/admin/ordenes' : '/'} replace />
    }

    return <Outlet />
}