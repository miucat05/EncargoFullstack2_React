import { useState } from "react";
import { Link } from "react-router-dom";
import { obtenerUsuarios, eliminarUsuario, obtenerSesion } from "../data/usuariosService";

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState(() => obtenerUsuarios())
    const sesion = obtenerSesion()

    const eliminar = (usuario) => {
        if (!window.confirm(`¿Eliminar a ${usuario.nombre} ${usuario.apellidos}?`)) return
        setUsuarios(eliminarUsuario(usuario.run))
    }

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
                            <tr key={u.run}>
                                <td>{u.run}</td>
                                <td>{u.nombre} {u.apellidos}</td>
                                <td>{u.correo}</td>
                                <td>
                                    <span className={`badge ${u.tipo === 'Administrador' ? 'text-bg-warning' : 'text-bg-secondary'}`}>
                                        {u.tipo}
                                    </span>
                                </td>
                                <td>{u.region}</td>
                                <td>{u.comuna}</td>
                                <td className="text-end">
                                    <Link to={`/admin/usuarios/${u.run}/editar`} className="btn btn-sm btn-outline-primary">
                                        Editar
                                    </Link>
                                    <Link
                                        to={`/admin/usuarios/${u.run}/historial`}
                                        className="btn btn-sm btn-outline-secondary ms-2"
                                    >
                                        Historial
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger ms-2"
                                        disabled={sesion?.run === u.run}
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