import { useNavigate } from "react-router-dom";
import FormularioUsuario from "../components/FormularioUsuario";
import { crearUsuarioApi } from "../api/usuariosApi";

export default function AdminUsuarioNuevo() {
    const navigate = useNavigate()

    const guardar = async (usuario) => {
        await crearUsuarioApi(usuario)
        navigate('/admin/usuarios')
    }

    return (
        <div>
            <h1 className="h3 mb-3">Nuevo usuario</h1>
            <div style={{ maxWidth: 640 }}>
                <FormularioUsuario
                    onGuardar={guardar}
                    onCancelar={() => navigate('/admin/usuarios')}
                />
            </div>
        </div>
    )
}