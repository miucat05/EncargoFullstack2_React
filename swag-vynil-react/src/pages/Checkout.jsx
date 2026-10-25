import { useState } from 'react'
import { Link } from 'react-router-dom'
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
    const { items, total } = useCarrito()
    const [datos, setDatos] = useState(datosIniciales)
    const [errores, setErrores] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setDatos((prev) => ({
            ...prev,
            [name]: value,
            // al cambiar la region se reinicia la comuna
            ...CampoFormulario(name === 'region' ? { comuna: '' } : {}),
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

        //aqui se procesa el pago y se crea la ordene
        console.log('Datos de compra válidos:', datos)
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