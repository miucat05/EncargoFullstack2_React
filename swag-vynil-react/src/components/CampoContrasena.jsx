import { useState } from 'react'

// Campo de contraseña con botón Ver/Ocultar. El estado "mostrar" es solo de este componente.
export default function CampoContrasena({ label, id, error, ...resto }) {
  const [mostrar, setMostrar] = useState(false)

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        <input
          id={id}
          name={id}
          type={mostrar ? 'text' : 'password'}
          className={`form-control${error ? ' is-invalid' : ''}`}
          {...resto}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setMostrar(!mostrar)}
        >
          {mostrar ? 'Ocultar' : 'Ver'}
        </button>
      </div>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}