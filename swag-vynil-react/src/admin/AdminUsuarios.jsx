import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerSesion } from "../data/usuariosService";
import { listarUsuariosApi, eliminarUsuarioApi } from "../api/usuariosApi";

const COLOR_TIPO = {
    Administrador: 'text-bg-warning',
    Vendedor: 'text-bg-info',
    Cliente: 'text-bg-secondary',
}

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')
    const sesion = obtenerSesion()

    useEffect(() => {
        listarUsuariosApi()
            .then(setUsuarios)
            .catch((e) => setError(e.message))
            .finally(() => setCargando(false))
    }, [])

    const eliminar = async (usuario) => {
        if (!window.confirm(`¿Eliminar a ${usuario.nombre} ${usuario.apellidos}?`)) return
        try {
            await eliminarUsuarioApi(usuario.id)
            setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id))
        } catch (e) {
            alert(e.message)
        }
    }

    if (cargando) return <p>Cargando usuarios...</p>
    if (error) return <div className="alert alert-danger">{error}</div>

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h1 className="h3 mb-0">Usuarios</h1>
                    <small className="text-muted">Gestión de cuentas de usuario y sus roles</small>
                </div>
                <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
                    + Nuevo Usuario
                </Link>
            </div>

            <div className="table-responsive bg-white rounded shadow-sm">
                <table className="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th>RUN</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Tipo</th>
                            <th>Región</th>
                            <th>Comuna</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => (
                            <tr key={u.id}>
                                <td>{u.run}</td>
                                <td>{u.nombre} {u.apellidos}</td>
                                <td>{u.correo}</td>
                                <td>
                                    <span className={`badge ${COLOR_TIPO[u.tipo]}`}>
                                        {u.tipo}
                                    </span>
                                </td>
                                <td>{u.region}</td>
                                <td>{u.comuna}</td>
                                <td className="text-end">
                                    <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-outline-primary">
                                        Editar
                                    </Link>
                                    <Link
                                        to={`/admin/usuarios/${u.id}/historial`}
                                        className="btn btn-sm btn-outline-secondary ms-2"
                                    >
                                        Historial
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger ms-2"
                                        disabled={sesion?.id === u.id}
                                        onClick={() => eliminar(u)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}