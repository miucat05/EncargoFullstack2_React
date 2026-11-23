import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CategoriaForm from "../components/admin/CategoriaForm";
import {
  crearCategoriaApi,
  actualizarCategoriaApi,
  obtenerCategoriaApi,
} from "../api/categoriasApi";

// Una sola página para crear y editar.
// Si la URL trae un :id estamos editando; si no, creando.
function AdminCategoriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editando = id !== undefined;
  const [categoria, setCategoria] = useState(null);
  const [cargando, setCargando] = useState(editando);
  const [noExiste, setNoExiste] = useState(false);

  useEffect(() => {
    if (!editando) return;
    obtenerCategoriaApi(id)
      .then(setCategoria)
      .catch(() => setNoExiste(true))
      .finally(() => setCargando(false));
  }, [id, editando]);

  const volver = () => navigate("/admin/categorias");

  // Devuelve el mensaje de error del backend (por ejemplo, nombre repetido)
  const guardar = async (datos) => {
    try {
      if (editando) {
        await actualizarCategoriaApi(id, datos);
      } else {
        await crearCategoriaApi(datos);
      }
      volver();
      return "";
    } catch (e) {
      return e.message || "No se pudo guardar la categoría.";
    }
  };

  if (cargando) {
    return <div className="container py-4">Cargando...</div>;
  }

  if (editando && noExiste) {
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