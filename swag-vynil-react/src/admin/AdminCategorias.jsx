import { useState } from "react";
import { Link } from "react-router-dom";
import { obtenerCategorias, eliminarCategoria } from "../data/categorias";

function AdminCategorias() {
  // ESTADO: la lista. Si cambia, React redibuja la tabla.
  const [categorias, setCategorias] = useState(() => obtenerCategorias());

  const manejarEliminar = (categoria) => {
    if (window.confirm(`¿Seguro que quieres eliminar "${categoria.nombre}"?`)) {
      eliminarCategoria(categoria.id);
      setCategorias(obtenerCategorias()); // vuelve a leer y actualiza la pantalla
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

      {categorias.length === 0 ? (
        <div className="alert alert-info">Aún no hay categorías.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.descripcion}</td>
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