import { useNavigate, useParams, Link } from "react-router-dom";
import CategoriaForm from "../components/admin/CategoriaForm";
import {
  crearCategoria,
  actualizarCategoria,
  obtenerCategoriaPorId,
} from "../data/categorias";

// Una sola página para crear y editar.
// Si la URL trae un :id estamos editando; si no, creando.
function AdminCategoriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editando = id !== undefined;
  const categoria = editando ? obtenerCategoriaPorId(id) : undefined;

  const volver = () => navigate("/admin/categorias");

  const guardar = (datos) => {
    if (editando) {
      actualizarCategoria(id, datos);
    } else {
      crearCategoria(datos);
    }
    volver();
  };

  if (editando && !categoria) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">La categoría no existe.</div>
        <Link to="/admin/categorias">&larr; Volver al listado</Link>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h1 className="h3 mb-3">{editando ? "Editar categoría" : "Nueva categoría"}</h1>
      <CategoriaForm categoriaInicial={categoria} onGuardar={guardar} onCancelar={volver} />
    </div>
  );
}

export default AdminCategoriaForm;