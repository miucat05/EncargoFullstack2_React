import { useState } from "react";

// Valida el formato; si el nombre está repetido lo avisa el backend (409)
function validarNombre(nombre) {
  const limpio = nombre.trim();
  if (limpio === "") return "El nombre es obligatorio.";
  if (limpio.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  if (limpio.length > 50) return "El nombre no puede pasar de 50 caracteres.";
  return "";
}

// Este componente solo muestra el formulario y valida.
// Recibe 3 PROPS desde afuera:
//   categoriaInicial -> datos para rellenar (al editar)
//   onGuardar        -> función async que guarda; devuelve "" si salió bien o el error
//   onCancelar       -> función del botón Cancelar
function CategoriaForm({ categoriaInicial, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(categoriaInicial?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(categoriaInicial?.descripcion ?? "");
  const [errorNombre, setErrorNombre] = useState("");

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    const error = validarNombre(nombre);
    setErrorNombre(error);
    if (error) return;

    const errorServidor = await onGuardar({ nombre: nombre.trim(), descripcion });
    if (errorServidor) setErrorNombre(errorServidor);
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