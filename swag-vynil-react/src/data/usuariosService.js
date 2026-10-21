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

export function obtenerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION))
  } catch {
    return null
  }
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}