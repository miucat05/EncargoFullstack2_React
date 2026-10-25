import { useState } from 'react'
import CampoFormulario from '../components/CampoFormulario'
import { validarCorreo } from '../utils/validaciones'

const VACIO = { nombre: '', correo: '', comentario: '' }

function validar({ nombre, correo, comentario }) {
  const errores = {}
  if (nombre.trim() === '') errores.nombre = 'El nombre es obligatorio.'
  else if (nombre.trim().length > 100) errores.nombre = 'El nombre no puede superar los 100 caracteres.'

  const errorCorreo = validarCorreo(correo)
  if (errorCorreo) errores.correo = errorCorreo

  if (comentario.trim() === '') errores.comentario = 'El comentario es obligatorio.'
  else if (comentario.trim().length > 500) errores.comentario = 'El comentario no puede superar los 500 caracteres.'

  return errores
}

export default function Contacto() {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  const cambiar = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value })
    setEnviado(false)
  }

  const enviar = (e) => {
    e.preventDefault()
    const nuevosErrores = validar(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    setEnviado(true)
    setDatos(VACIO)
  }

  return (
    <main className="container py-5">
      <div className="text-center mb-4">
        <img src="/images/logoswag.png" alt="Logo Swag Vynil" style={{ maxWidth: 120 }} />
        <h2 className="mt-2">Swag Vynil</h2>
      </div>

      <section className="mx-auto" style={{ maxWidth: 600 }}>
        <div className="card p-4 shadow-sm">
          <h3 className="text-center mb-4 text-uppercase fw-bold fs-5">Formulario de contacto</h3>

          {enviado && (
            <div className="alert alert-success" role="alert">
              ¡Mensaje enviado! Te responderemos a la brevedad.
            </div>
          )}

          <form onSubmit={enviar} noValidate>
            <CampoFormulario
              label="Nombre completo"
              id="nombre"
              value={datos.nombre}
              onChange={cambiar}
              error={errores.nombre}
            />
            <CampoFormulario
              label="Correo electrónico"
              id="correo"
              type="email"
              placeholder="ejemplo@gmail.com, @duoc.cl"
              value={datos.correo}
              onChange={cambiar}
              error={errores.correo}
            />
            <CampoFormulario
              label="Comentario"
              id="comentario"
              as="textarea"
              rows={4}
              value={datos.comentario}
              onChange={cambiar}
              error={errores.comentario}
            />

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-dark px-4 py-2">ENVIAR MENSAJE</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}