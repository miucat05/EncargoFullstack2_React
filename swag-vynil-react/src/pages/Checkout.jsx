import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { crearOrden } from '../data/ordenes'
import { useCarrito } from '../context/CarritoContext'
import CampoFormulario from '../components/CampoFormulario'
import ResumenCompra from '../components/ResumenCompra'
import { regionesComunas } from '../data/usuarios-data'
import { obtenerSesion } from '../data/usuariosService'
import { validarCorreo } from '../utils/validaciones'
import { formatoPrecio } from '../utils/formato'

const vacio = {
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: '',
    comuna: '',
    indicaciones: '',
    metodoPago: 'Tarjeta',
    simularError: false,
}

const obligatorio = (valor, mensaje) => (valor.trim() === '' ? mensaje : '')

//si hay una sesion iniciada los datos del cliente se rellenan automaticamente
function datosIniciales() {
    const sesion = obtenerSesion()
    if (!sesion) return vacio

    return {
        ...vacio,
        nombre: (sesion.nombre || '').trim(),
        apellidos: (sesion.apellidos || '').trim(),
        correo: sesion.correo || '',
        calle: sesion.direccion || '',
        region: sesion.region || '',
        comuna: sesion.comuna || '',
    }
}

export default function Checkout() {
    const navigate = useNavigate()
    const { items, total, vaciar } = useCarrito()
    const [datos, setDatos] = useState(datosIniciales)
    const [errores, setErrores] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setDatos((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            // al cambiar la región se reinicia la comuna
            ...(name === 'region' ? { comuna: '' } : {}),
        }))
    }

    const validar = () => ({
        nombre: obligatorio(datos.nombre, 'El nombre es obligatorio.'),
        apellidos: obligatorio(datos.apellidos, 'Los apellidos son obligatorios.'),
        correo: validarCorreo(datos.correo),
        calle: obligatorio(datos.calle, 'La calle es obligatoria.'),
        region: datos.region === '' ? 'Seleccione una región.' : '',
        comuna: datos.comuna === '' ? 'Seleccione una comuna.' : '',
    })

    const handleSubmit = (ev) => {
        ev.preventDefault()

        const nuevos = validar()
        setErrores(nuevos)
        if (Object.values(nuevos).some(Boolean)) return

        const pagoExitoso = !datos.simularError

        const orden = crearOrden({
            cliente: `${datos.nombre.trim()} ${datos.apellidos.trim()}`,
            correo: datos.correo.trim(),
            runUsuario: obtenerSesion()?.run ?? null,
            productos: items.map(({ nombre, cantidad, precio, imagen }) => ({
                nombre,
                cantidad,
                precio,
                imagen,
            })),
            estado: pagoExitoso ? 'Completada' : 'Fallida',
            metodoPago: datos.metodoPago,
            entrega: {
                calle: datos.calle.trim(),
                departamento: datos.departamento.trim(),
                region: datos.region,
                comuna: datos.comuna,
                indicaciones: datos.indicaciones.trim(),
            },
        })

        if (pagoExitoso) {
            navigate(`/compra/exitosa/${orden.id}`)
            vaciar()
        } else {
            // el carrito se conserva para poder reintentar el pago
            navigate(`/compra/error/${orden.id}`)
        }
    }

    if (items.length === 0) {
        return (
            <main className='container py-5 text-center'>
                <h1 className='h3 mb-3'>No hay productos para pagar</h1>
                <Link to="/productos" className='btn btn-primary'>Ver productos</Link>
            </main>
        )
    }
    return (
        <main className="container py-4">
            <div className="bg-white p-4 rounded shadow-sm mx-auto" style={{ maxWidth: 760 }}>
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                    <div>
                        <h1 className="h4 mb-1">Carrito de compra</h1>
                        <small className="text-muted">Completa la siguiente información</small>
                    </div>
                    <span className="badge text-bg-primary fs-6">
                        Total a pagar: {formatoPrecio(total)}
                    </span>
                </div>

                <ResumenCompra items={items} />

                <form onSubmit={handleSubmit} noValidate className="mt-4">
                    <h2 className="h5">Información del cliente</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <CampoFormulario
                                label="Nombre"
                                id="nombre"
                                value={datos.nombre}
                                onChange={handleChange}
                                error={errores.nombre}
                            />
                        </div>
                        <div className="col-md-6">
                            <CampoFormulario
                                label="Apellidos"
                                id="apellidos"
                                value={datos.apellidos}
                                onChange={handleChange}
                                error={errores.apellidos}
                            />
                        </div>
                        <div className="col-md-6">
                            <CampoFormulario
                                label="Correo"
                                id="correo"
                                type="email"
                                value={datos.correo}
                                onChange={handleChange}
                                error={errores.correo}
                            />
                        </div>
                    </div>

                    <h2 className="h5 mt-3">Dirección de entrega de los productos</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <CampoFormulario
                                label="Calle"
                                id="calle"
                                value={datos.calle}
                                onChange={handleChange}
                                error={errores.calle}
                            />
                        </div>
                        <div className="col-md-6">
                            <CampoFormulario
                                label="Departamento (opcional)"
                                id="departamento"
                                placeholder="Ej: 603"
                                value={datos.departamento}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <CampoFormulario
                                as="select"
                                label="Región"
                                id="region"
                                value={datos.region}
                                onChange={handleChange}
                                error={errores.region}
                            >
                                <option value="">-- Seleccione la región --</option>
                                {Object.keys(regionesComunas).map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </CampoFormulario>
                        </div>
                        <div className="col-md-6">
                            <CampoFormulario
                                as="select"
                                label="Comuna"
                                id="comuna"
                                value={datos.comuna}
                                onChange={handleChange}
                                error={errores.comuna}
                            >
                                <option value="">-- Seleccione la comuna --</option>
                                {(regionesComunas[datos.region] || []).map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </CampoFormulario>
                        </div>
                    </div>

                                        <CampoFormulario
                        as="textarea"
                        rows={3}
                        label="Indicaciones para la entrega (opcional)"
                        id="indicaciones"
                        placeholder="Ej: Entre calles, color del edificio, no tiene timbre."
                        value={datos.indicaciones}
                        onChange={handleChange}
                    />

                    <h2 className="h5 mt-3">Pago</h2>
                    <CampoFormulario
                        as="select"
                        label="Método de pago"
                        id="metodoPago"
                        value={datos.metodoPago}
                        onChange={handleChange}
                    >
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                    </CampoFormulario>

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="simularError"
                            name="simularError"
                            checked={datos.simularError}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="simularError">
                            Simular pago rechazado (solo para la demostración)
                        </label>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
                        <button type="submit" className="btn btn-success">
                            Pagar ahora {formatoPrecio(total)}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}