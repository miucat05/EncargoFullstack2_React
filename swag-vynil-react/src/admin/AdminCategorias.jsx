import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listarCategoriasApi, eliminarCategoriaApi } from "../api/categoriasApi";

function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarCategorias = async () => {
    try {
      setCategorias(await listarCategoriasApi());
      setError("");
    } catch (e) {
      setError(e.message || "No se pudieron cargar las categorías.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const manejarEliminar = async (categoria) => {
    if (!window.confirm(`¿Seguro que quieres eliminar "${categoria.nombre}"?`)) return;
    try {
      await eliminarCategoriaApi(categoria.id);
      await cargarCategorias();
    } catch (e) {
      // Por ejemplo: la categoría tiene productos asociados (409)
      alert(e.message || "No se pudo eliminar la categoría.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Categorías</h1>
        <Link to="/admin/categorias/nueva" className="btn btn-primary">
          + Nueva categoría
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {cargando && <p>Cargando categorías...</p>}

      {!cargando && !error && categorias.length === 0 && (
        <div className="alert alert-info">Aún no hay categorías.</div>
      )}

      {categorias.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Productos</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.descripcion}</td>
                  <td>{c.cantidad}</td>
                  <td className="text-end">
                    <Link
                      to={`/admin/categorias/editar/${c.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => manejarEliminar(c)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/admin" className="btn btn-link px-0">&larr; Volver al panel</Link>
    </div>
  );
}

export default AdminCategorias;