// Campo de formulario reutilizable: label + control + mensaje de error.
// as: 'input' (por defecto), 'select' o 'textarea'.
// Para 'select', las <option> van como children.
export default function CampoFormulario({ label, id, error, as: Control = 'input', children, ...resto }) {
  const claseBase = Control === 'select' ? 'form-select' : 'form-control'
 
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <Control
        id={id}
        name={id}
        className={`${claseBase}${error ? ' is-invalid' : ''}`}
        {...resto}
      >
        {children}
      </Control>
      <div className="invalid-feedback">{error}</div>
    </div>
  )
}
 