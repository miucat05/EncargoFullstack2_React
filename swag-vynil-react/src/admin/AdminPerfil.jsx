import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import FormularioUsuario from '../components/FormularioUsuario'
import {
  obtenerSesion,
  buscarUsuarioPorRun,
  actualizarUsuario,
  guardarSesion,
} from '../data/usuariosService'

export default function AdminPerfil() {
  const sesion = obtenerSesion()
  const [usuario, setUsuario] = useState(() => (sesion ? buscarUsuarioPorRun(sesion.run) : null))
  const [editando, setEditando] = useState(false)
  const [guardado, setGuardado] = useState(false)

  if (!usuario) {
    return (
      <div>
        <h1 className="h3 mb-3">Perfil</h1>
        <p>No hay una sesión iniciada.</p>
        <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
      </div>
    )
  }

  const guardar = (cambios) => {
    actualizarUsuario(usuario.run, cambios)
    const actualizado = { ...usuario, ...cambios }
    guardarSesion(actualizado)
    setUsuario(actualizado)
    setEditando(false)
    setGuardado(true)
  }

  const datos = [
    ['RUN', usuario.run],
    ['Correo', usuario.correo],
    ['Fecha de nacimiento', usuario.fechaNacimiento || '—'],
    ['Tipo', usuario.tipo],
    ['Región', usuario.region],
    ['Comuna', usuario.comuna],
    ['Dirección', usuario.direccion],
  ]

  return (
    <div>
      <h1 className="h3 mb-3">Perfil</h1>

      {guardado && (
        <div className="alert alert-success" style={{ maxWidth: 640 }}>
          Perfil actualizado correctamente.
        </div>
      )}

      <div style={{ maxWidth: 640 }}>
        {editando ? (
          <FormularioUsuario
            inicial={usuario}
            modoEdicion
            mostrarTipo={false}
            onGuardar={guardar}
            onCancelar={() => setEditando(false)}
          />
        ) : (
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5 mb-3">{usuario.nombre} {usuario.apellidos}</h2>

              <dl className="row mb-3">
                {datos.map(([etiqueta, valor]) => (
                  <Fragment key={etiqueta}>
                    <dt className="col-sm-4">{etiqueta}</dt>
                    <dd className="col-sm-8">{valor}</dd>
                  </Fragment>
                ))}
              </dl>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setGuardado(false)
                  setEditando(true)
                }}
              >
                Editar perfil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}