import { renovarApi } from './authApi'
import { msParaExpirar, guardarSesionApi } from '../data/usuariosService'

const UMBRAL_MS = 10 * 60 * 1000 // renovar cuando queden menos de 10 minutos

export async function renovarSesionSiCorresponde() {
  const restante = msParaExpirar()
  if (restante === null || restante <= 0 || restante > UMBRAL_MS) return

  try {
    guardarSesionApi(await renovarApi())
  } catch {
    // si falla, la sesión simplemente caduca sola
  }
}