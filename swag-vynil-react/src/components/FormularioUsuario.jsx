import { useState } from 'react'
import CampoFormulario from './CampoFormulario'
import CampoContrasena from './CampoContrasena'
import { regionesComunas } from '../data/usuarios-data'
import { obtenerUsuarios } from '../data/usuariosService'
import { validarRun, validarCorreo, validarContrasena } from '../utils/validaciones'

const vacio = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  fechaNacimiento: '',
  tipo: 'Cliente',
  region: '',
  comuna: '',
  direccion: '',
  contrasena: '',
}

const obligatorio = (valor, mensaje) => (valor.trim() === '' ? mensaje : '')
const normalizarRun = (valor) => valor.replace(/[.\-]/g, '').toUpperCase()

export default function FormularioUsuario({ inicial = vacio, modoEdicion = false, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState({ ...vacio, ...inicial })
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setDatos((prev) => ({
      ...prev,
      [name]: value,
      // al cambiar la región se reinicia la comuna
      ...(name === 'region' ? { comuna: '' } : {}),
    }))
  }

  const validar = () => {
    const run = normalizarRun(datos.run)
    const existentes = obtenerUsuarios()
    const runRepetido = existentes.some((u) => u.run === run)
    const correoRepetido = existentes.some(
      (u) => u.run !== run && u.correo.toLowerCase() === datos.correo.trim().toLowerCase()
    )

    return {
      run: modoEdicion
        ? ''
        : validarRun(datos.run) || (runRepetido ? 'Ya existe un usuario con ese RUN.' : ''),
      nombre: obligatorio(datos.nombre, 'El nombre es obligatorio.'),
      apellidos: obligatorio(datos.apellidos, 'Los apellidos son obligatorios.'),
      correo: validarCorreo(datos.correo) || (correoRepetido ? 'Ya existe una cuenta con ese correo.' : ''),
      region: datos.region === '' ? 'Seleccione una región.' : '',
      comuna: datos.comuna === '' ? 'Seleccione una comuna.' : '',
      direccion: obligatorio(datos.direccion, 'La dirección es obligatoria.'),
      contrasena: modoEdicion ? '' : validarContrasena(datos.contrasena),
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const nuevos = validar()
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) return

    const { contrasena, ...resto } = datos
    onGuardar({
      ...resto,
      run: normalizarRun(datos.run),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      direccion: datos.direccion.trim(),
      //modo edicion nos se toca la contraseña
      ...(modoEdicion ? {} : { contrasena }),
    })
  }

  return (
    <form className="bg-white p-4 rounded shadow-sm" onSubmit={handleSubmit} noValidate>
      <CampoFormulario
        label="RUN (sin puntos ni guión)"
        id="run"
        placeholder="19011022K"
        value={datos.run}
        onChange={handleChange}
        error={errores.run}
        disabled={modoEdicion}
      />

      <CampoFormulario
        label="Nombre"
        id="nombre"
        value={datos.nombre}
        onChange={handleChange}
        error={errores.nombre}
      />

      <CampoFormulario
        label="Apellidos"
        id="apellidos"
        value={datos.apellidos}
        onChange={handleChange}
        error={errores.apellidos}
      />

      <CampoFormulario
        label="Correo electrónico"
        id="correo"
        type="email"
        value={datos.correo}
        onChange={handleChange}
        error={errores.correo}
      />

      <CampoFormulario
        label="Fecha de nacimiento"
        id="fechaNacimiento"
        type="date"
        value={datos.fechaNacimiento}
        onChange={handleChange}
      />

      <CampoFormulario
        as="select"
        label="Tipo de usuario"
        id="tipo"
        value={datos.tipo}
        onChange={handleChange}
      >
        <option value="Cliente">Cliente</option>
        <option value="Administrador">Administrador</option>
      </CampoFormulario>

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

      <CampoFormulario
        label="Dirección"
        id="direccion"
        value={datos.direccion}
        onChange={handleChange}
        error={errores.direccion}
      />

      {!modoEdicion && (
        <CampoContrasena
          label="Contraseña"
          id="contrasena"
          autoComplete="new-password"
          value={datos.contrasena}
          onChange={handleChange}
          error={errores.contrasena}
        />
      )}

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  )
}