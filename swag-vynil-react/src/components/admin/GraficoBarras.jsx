export default function GraficoBarras({ datos, claseColor = 'bg-primary' }) {
  if (datos.length === 0) {
    return <p className="text-muted mb-0">No hay datos para mostrar.</p>
  }

  const maximo = Math.max(...datos.map((dato) => dato.valor))

  return (
    <ul className="list-unstyled mb-0">
      {datos.map((dato) => (
        <li key={dato.etiqueta} className="mb-3">
          <div className="d-flex justify-content-between small">
            <span>{dato.etiqueta}</span>
            <strong>{dato.valor}</strong>
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-label={dato.etiqueta}
            aria-valuenow={dato.valor}
            aria-valuemin="0"
            aria-valuemax={maximo}
          >
            <div
              className={`progress-bar ${claseColor}`}
              style={{ width: `${(dato.valor / maximo) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}