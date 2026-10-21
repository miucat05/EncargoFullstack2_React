import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario'
import CampoContrasena from '../components/CampoContrasena'
import { regionesComunas } from '../data/usuarios-data'
import { crearUsuario, buscarUsuarioPorCorreo } from '../data/usuariosService'
import { validarRun, validarCorreo, validarContrasena } from '../utils/validaciones'
import './registro.css'

const inicial = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: '',
  contrasena: '',
  confirmar: '',
}

const obligatorio = (valor, mensaje) => (valor.trim() === '' ? mensaje : '')

export default function Registro() {
  const navigate = useNavigate()
  const [datos, setDatos] = useState(inicial)
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

  const validar = () => ({
    run: validarRun(datos.run),
    nombre: obligatorio(datos.nombre, 'El nombre es obligatorio.'),
    apellidos: obligatorio(datos.apellidos, 'Los apellidos son obligatorios.'),
    correo: validarCorreo(datos.correo),
    region: datos.region === '' ? 'Seleccione una región.' : '',
    comuna: datos.comuna === '' ? 'Seleccione una comuna.' : '',
    direccion: obligatorio(datos.direccion, 'La dirección es obligatoria.'),
    contrasena: validarContrasena(datos.contrasena),
    confirmar:
      datos.confirmar === '' || datos.confirmar !== datos.contrasena
        ? 'Las contraseñas no coinciden.'
        : '',
  })

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const nuevos = validar()
    setErrores(nuevos)
    if (Object.values(nuevos).some(Boolean)) return

    if (buscarUsuarioPorCorreo(datos.correo)) {
      setErrores({ correo: 'Ya existe una cuenta con ese correo.' })
      return
    }

    crearUsuario({
      run: datos.run.replace(/[.\-]/g, '').toUpperCase(),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      contrasena: datos.contrasena,
      fechaNacimiento: datos.fechaNacimiento,
      tipo: 'Cliente',
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion.trim(),
    })

    alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.')
    navigate('/login')
  }

  return (
    <main>
      <form
        className="bg-white p-4 rounded shadow-sm mx-auto form-card"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="mb-4">Crear cuenta</h2>

        <CampoFormulario
          label="RUN (sin puntos ni guión)"
          id="run"
          placeholder="19011022K"
          value={datos.run}
          onChange={handleChange}
          error={errores.run}
        />

        <CampoFormulario
          label="Nombre"
          id="nombre"
          autoComplete="given-name"
          value={datos.nombre}
          onChange={handleChange}
          error={errores.nombre}
        />

        <CampoFormulario
          label="Apellidos"
          id="apellidos"
          autoComplete="family-name"
          value={datos.apellidos}
          onChange={handleChange}
          error={errores.apellidos}
        />

        <CampoFormulario
          label="Correo electrónico"
          id="correo"
          type="email"
          autoComplete="email"
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

        <CampoContrasena
          label="Contraseña"
          id="contrasena"
          autoComplete="new-password"
          value={datos.contrasena}
          onChange={handleChange}
          error={errores.contrasena}
        />

        <CampoContrasena
          label="Confirmar contraseña"
          id="confirmar"
          autoComplete="new-password"
          value={datos.confirmar}
          onChange={handleChange}
          error={errores.confirmar}
        />

        <button type="submit" className="btn btn-primary">Registrarse</button>

        <p className="mt-3 mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </main>
  )
}