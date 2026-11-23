import { formatoPrecio } from "../utils/formato";

export default function ResumenCompra ({ items }) {
    return (
        <div className="table-responsive">
            <table className="table table-sm align-middle mb-0">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th className="text-end">Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-end">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, indice) => (
                        <tr key={`${item.nombre}-${indice}`}>
                            <td>
                                {item.imagen && (
                                    <img 
                                        src={item.imagen}
                                        alt={item.nombre} 
                                        width="40"
                                        height="40"
                                        className="rounded"
                                        style={{ objectFit: 'cover' }}
                                    />
                                )}
                            </td>
                            <td>{item.nombre}</td>
                            <td className="text-end">{formatoPrecio(item.precio)}</td>
                            <td className="text-center">{item.cantidad}</td>
                            <td className="text-end">{formatoPrecio(item.precio * item.cantidad)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}