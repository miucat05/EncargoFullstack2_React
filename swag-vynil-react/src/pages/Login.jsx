import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario'
import CampoContrasena from '../components/CampoContrasena'
import HistoriaEmpresa from '../components/HistoriaEmpresa'
import { autenticar, guardarSesion } from '../data/usuariosService'
import { validarCorreo, validarContrasena } from '../utils/validaciones'
import './login.css'

export default function Login() {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errores, setErrores] = useState({})

  // validación en tiempo real, igual que el login.js original
  const cambiarCorreo = (e) => {
    const valor = e.target.value
    setCorreo(valor)
    setErrores((prev) => ({ ...prev, correo: validarCorreo(valor) }))
  }

  const cambiarContrasena = (e) => {
    const valor = e.target.value
    setContrasena(valor)
    setErrores((prev) => ({ ...prev, contrasena: validarContrasena(valor) }))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const nuevos = {
      correo: validarCorreo(correo),
      contrasena: validarContrasena(contrasena),
    }
    setErrores(nuevos)
    if (nuevos.correo || nuevos.contrasena) return

    const usuario = autenticar(correo, contrasena)
    if (!usuario) {
      setErrores({ contrasena: 'Correo o contraseña incorrectos.' })
      return
    }

    guardarSesion(usuario)
    const esAdmin = usuario.tipo === 'Administrador' || usuario.tipo === 'Vendedor'
    navigate(esAdmin ? '/admin' : '/')
  }

  return (
    <main>
      <HistoriaEmpresa />

      <form
        className="bg-white p-4 rounded shadow-sm mx-auto form-card"
        id="formulario"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="mb-4">Iniciar sesión</h2>

        <CampoFormulario
          label="Correo electronico"
          id="correo"
          type="email"
          autoComplete="username"
          value={correo}
          onChange={cambiarCorreo}
          error={errores.correo}
        />

        <CampoContrasena
          label="Contraseña"
          id="contrasena"
          autoComplete="current-password"
          value={contrasena}
          onChange={cambiarContrasena}
          error={errores.contrasena}
        />

        <button type="submit" className="btn btn-primary">Iniciar sesión</button>

        <p className="mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/registro">Registrate aquí</Link>
        </p>
      </form>
    </main>
  )
}