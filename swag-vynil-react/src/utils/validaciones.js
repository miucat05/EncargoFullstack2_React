// Cada validador devuelve '' si el valor es válido, o el mensaje de error.

const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com']

export function validarCorreo(valor) {
  const correo = valor.trim()
  if (correo === '') return 'El correo es obligatorio.'
  if (correo.length > 100) return 'El correo no puede superar los 100 caracteres.'

  const partes = correo.split('@')
  const dominio = partes.length === 2 ? partes[1].toLowerCase() : ''
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    return 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
  }
  return ''
}

export function validarContrasena(valor) {
  if (valor === '') return 'La contraseña es obligatoria.'
  if (valor.length < 4 || valor.length > 10) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.'
  }
  return ''
}

// Solo valida el formato: 7 u 8 dígitos + dígito verificador (0-9 o K)
export function validarRun(valor) {
  const run = valor.replace(/[.\-]/g, '').toUpperCase()
  return /^\d{7,8}[0-9K]$/.test(run) ? '' : 'El RUN ingresado no es válido.'
}