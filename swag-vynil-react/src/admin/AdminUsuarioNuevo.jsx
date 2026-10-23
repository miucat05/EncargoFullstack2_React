import { useNavigate } from "react-router-dom";
import FormularioUsuario from "../components/FormularioUsuario";
import { crearUsuario } from "../data/usuariosService";

export default function AdminUsuarioNuevo() {
    const navigate = useNavigate()

    const guardar = (usuario) => {
        crearUsuario(usuario)
        navigate('/admin/usuarios')
    }

    return (
        <div>
            <h1 className="h3 mb-3">Nuevo usuario</h1>
            <div style={{maxWidth: 640}}>
                <FormularioUsuario
                    onGuardar={guardar}
                    onCancelar={() => navigate('/admin/usuarios')}
                />
            </div>
        </div>
    )
}