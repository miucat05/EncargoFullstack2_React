import { usuarios as usuariosIniciales } from './usuarios-data'

const CLAVE_USUARIOS = 'usuarios'
const CLAVE_SESION = 'sesion'

// ---------- Persistencia ----------
function cargar() {
  try {
    const guardado = localStorage.getItem(CLAVE_USUARIOS)
    if (guardado) return JSON.parse(guardado)
  } catch {
    // si el JSON está dañado, se parte de los datos iniciales
  }
  return [...usuariosIniciales]
}

function guardar(lista) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista))
}

// ---------- CRUD ----------
export function obtenerUsuarios() {
  return cargar()
}

export function buscarUsuarioPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase()
  return cargar().find((u) => u.correo.toLowerCase() === buscado)
}

export function buscarUsuarioPorRun(run) {
  return cargar().find((u) => u.run === run)
}

export function crearUsuario(usuario) {
  const lista = cargar()
  lista.push(usuario)
  guardar(lista)
  return usuario
}

export function actualizarUsuario(run, cambios) {
  const lista = cargar().map((u) => (u.run === run ? { ...u, ...cambios } : u))
  guardar(lista)
  return lista
}

export function eliminarUsuario(run) {
  const lista = cargar().filter((u) => u.run !== run)
  guardar(lista)
  return lista
}

// ---------- Autenticación ----------
export function autenticar(correo, contrasena) {
  const usuario = buscarUsuarioPorCorreo(correo)
  return usuario && usuario.contrasena === contrasena ? usuario : null
}

export function guardarSesion(usuario) {
  const { contrasena, ...datosSinClave } = usuario
  localStorage.setItem(CLAVE_SESION, JSON.stringify(datosSinClave))
}

const ROL_A_TIPO = {
  ADMINISTRADOR: 'Administrador',
  VENDEDOR: 'Vendedor',
  CLIENTE: 'Cliente',
}

// Guarda la sesión que devuelve el backend (incluye el token JWT)
export function guardarSesionApi(respuesta) {
  const { rol, ...datos } = respuesta
  const sesion = { ...datos, rol, tipo: ROL_A_TIPO[rol] ?? 'Cliente' }
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
}

// Lee la fecha de expiración (exp, en segundos) que viene dentro del JWT
function tokenVencido(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const { exp } = JSON.parse(atob(payload))
    return !exp || exp * 1000 < Date.now()
  } catch {
    return true // si no se puede leer, se considera inválido
  }
}

export function obtenerSesion() {
  try {
    const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION))
    if (!sesion) return null

    // sesión del sistema antiguo (sin token) o con token vencido: se descarta
    if (!sesion.token || tokenVencido(sesion.token)) {
      localStorage.removeItem(CLAVE_SESION)
      return null
    }
    return sesion
  } catch {
    return null
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}