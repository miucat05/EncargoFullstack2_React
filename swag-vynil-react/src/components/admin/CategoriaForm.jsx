import { useState } from "react";
import { validarNombreCategoria } from "../../data/categorias";

// Este componente solo muestra el formulario y valida.
// Recibe 3 PROPS desde afuera:
//   categoriaInicial -> datos para rellenar (al editar)
//   onGuardar        -> función que se ejecuta si todo está bien
//   onCancelar       -> función del botón Cancelar
function CategoriaForm({ categoriaInicial, onGuardar, onCancelar }) {
  // ESTADOS: lo que el usuario va escribiendo
  const [nombre, setNombre] = useState(categoriaInicial?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(categoriaInicial?.descripcion ?? "");
  const [errorNombre, setErrorNombre] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault(); // evita que la página se recargue

    const error = validarNombreCategoria(nombre, categoriaInicial?.id);
    setErrorNombre(error);
    if (error) return;

    onGuardar({ nombre, descripcion });
  };

  return (
    <form onSubmit={manejarEnvio} noValidate className="card card-body shadow-sm">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre *</label>
        <input
          id="nombre"
          type="text"
          className={`form-control ${errorNombre ? "is-invalid" : ""}`}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          maxLength={50}
        />
        {errorNombre && <div className="invalid-feedback">{errorNombre}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción (opcional)</label>
        <textarea
          id="descripcion"
          className="form-control"
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default CategoriaForm;