import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import FormularioUsuario from '../components/FormularioUsuario'
import { obtenerUsuarioApi, actualizarUsuarioApi } from '../api/usuariosApi'

export default function AdminUsuarioEditar() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        obtenerUsuarioApi(id)
            .then(setUsuario)
            .catch(setError)
            .finally(() => setCargando(false))
    }, [id])

    if (cargando) return <p>Cargando usuario...</p>

    if (error || !usuario) {
        return (
            <div>
                <h1 className='h3 mb-3'>
                    {error?.status === 404 ? 'Usuario no encontrado' : 'No se pudo cargar el usuario'}
                </h1>
                {error && error.status !== 404 && <p className='text-danger'>{error.message}</p>}
                <Link to="/admin/usuarios" className='btn btn-outline-secondary'>
                    Volver al listado
                </Link>
            </div>
        )
    }

    const guardar = async (cambios) => {
        await actualizarUsuarioApi(id, cambios)
        navigate('/admin/usuarios')
    }

    return (
        <div>
            <h1 className='h3 mb-3'>Editar usuario</h1>
            <div style={{ maxWidth: 640 }}>
                <FormularioUsuario
                    inicial={usuario}
                    modoEdicion
                    onGuardar={guardar}
                    onCancelar={() => navigate('/admin/usuarios')}
                />
            </div>
        </div>
    )
}