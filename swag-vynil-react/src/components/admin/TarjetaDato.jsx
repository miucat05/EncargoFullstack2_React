export default function TarjetaDato({ titulo, valor}) {
    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
                <p className="text-muted mb-1">{titulo}</p>
                <h3 className="fw-bold mb-0">{valor}</h3>
            </div>
        </div>
    )
}