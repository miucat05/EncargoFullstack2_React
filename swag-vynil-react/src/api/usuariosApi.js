import { apiFetch } from './cliente'

const ROL_A_TIPO = {
    ADMINISTRADOR: 'Administrador',
    VENDEDOR: 'Vendedor',
    CLIENTE: 'Cliente',
}

// Backend -> frontend: agrega "tipo" a partir de "rol"
function aFrontend(u) {
    return {
        ...u,
        region: u.region ?? '',
        comuna: u.comuna ?? '',
        direccion: u.direccion ?? '',
        fechaNacimiento: u.fechaNacimiento ?? '',
        tipo: ROL_A_TIPO[u.rol] ?? 'Cliente',
    }
}

// Frontend -> backend: envía solo los campos que la API espera
function aBackend(datos) {
    const { run, nombre, apellidos, correo, contrasena, tipo, region, comuna, direccion, fechaNacimiento } = datos
    return {
        run,
        nombre,
        apellidos,
        correo,
        contrasena: contrasena || undefined, // vacía = no cambiar
        rol: (tipo || 'Cliente').toUpperCase(),
        region,
        comuna,
        direccion,
        fechaNacimiento: fechaNacimiento || undefined,
    }
}

export async function listarUsuariosApi() {
    const lista = await apiFetch('/api/v1/usuarios')
    return lista.map(aFrontend)
}

export async function obtenerUsuarioApi(id) {
    return aFrontend(await apiFetch(`/api/v1/usuarios/${id}`))
}

export async function crearUsuarioApi(datos) {
    return aFrontend(await apiFetch('/api/v1/usuarios', { method: 'POST', body: aBackend(datos) }))
}

export async function actualizarUsuarioApi(id, datos) {
    return aFrontend(await apiFetch(`/api/v1/usuarios/${id}`, { method: 'PUT', body: aBackend(datos) }))
}

export function eliminarUsuarioApi(id) {
    return apiFetch(`/api/v1/usuarios/${id}`, { method: 'DELETE' })
}