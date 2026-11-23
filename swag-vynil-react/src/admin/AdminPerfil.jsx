import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FormularioUsuario from '../components/FormularioUsuario'
import { obtenerSesion, actualizarSesion } from '../data/usuariosService'
import { obtenerUsuarioApi, actualizarUsuarioApi } from '../api/usuariosApi'

export default function AdminPerfil() {
  const idSesion = obtenerSesion()?.id
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [editando, setEditando] = useState(false)
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    if (!idSesion) {
      setCargando(false)
      return
    }
    obtenerUsuarioApi(idSesion)
      .then(setUsuario)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false))
  }, [idSesion])

  if (cargando) return <p>Cargando perfil...</p>

  if (!usuario) {
    return (
      <div>
        <h1 className="h3 mb-3">Perfil</h1>
        {error
          ? <div className="alert alert-danger">{error}</div>
          : <p>No hay una sesión iniciada.</p>}
        <Link to="/login" className="btn btn-primary">Iniciar sesión</Link>
      </div>
    )
  }

  const guardar = async (cambios) => {
    const actualizado = await actualizarUsuarioApi(usuario.id, cambios)
    actualizarSesion(actualizado)
    setUsuario(actualizado)
    setEditando(false)
    setGuardado(true)
  }

  const datos = [
    ['RUN', usuario.run],
    ['Correo', usuario.correo],
    ['Fecha de nacimiento', usuario.fechaNacimiento],
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
                    <dd className="col-sm-8">{valor || '—'}</dd>
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