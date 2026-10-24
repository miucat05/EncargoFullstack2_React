import { useNavigate, useParams, Link } from 'react-router-dom'
import FormularioUsuario from '../components/FormularioUsuario'
import { buscarUsuarioPorRun, actualizarUsuario } from '../data/usuariosService'

export default function AdminUsuarioEditar() {
    const { run } = useParams()
    const navigate = useNavigate()
    const usuario = buscarUsuarioPorRun(run)

    if (!usuario) {
        return (
            <div>
                <h1 className='h3 mb-3'>Usuario no encontrado</h1>
                <Link to="/admin/usuarios" className='btn btn-outline-secondary'>
                    Volver al listado
                </Link>
            </div>
        )
    }

    const guardar = (cambios) => {
        actualizarUsuario(run, cambios)
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
                    onCancelar={() => navigate ('/admin/usuarios')}
                />
            </div>
        </div>
    )
}