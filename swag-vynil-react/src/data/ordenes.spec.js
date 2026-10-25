import { crearOrden, obtenerOrdenPorId, calcularTotalOrden, obtenerOrdenesPorUsuario } from './ordenes'

describe('data/ordenes', () => {
  beforeEach(() => localStorage.clear())

  it('calcularTotalOrden suma precio por cantidad de cada producto', () => {
    const orden = {
      productos: [
        { nombre: 'A', precio: 1000, cantidad: 2 },
        { nombre: 'B', precio: 500, cantidad: 1 },
      ],
    }
    expect(calcularTotalOrden(orden)).toBe(2500)
  })

  it('crearOrden asigna un id nuevo y la orden queda guardada', () => {
    const orden = crearOrden({ cliente: 'Cata', productos: [], estado: 'Completada' })
    expect(orden.id).toBeGreaterThan(4) // hay 4 órdenes iniciales
    expect(obtenerOrdenPorId(orden.id).cliente).toBe('Cata')
  })

  it('crearOrden genera ids consecutivos', () => {
    const primera = crearOrden({ cliente: 'A', productos: [] })
    const segunda = crearOrden({ cliente: 'B', productos: [] })
    expect(segunda.id).toBe(primera.id + 1)
  })

  it('obtenerOrdenPorId acepta el id como texto (viene de la URL) y devuelve undefined si no existe', () => {
    expect(obtenerOrdenPorId('1').id).toBe(1)
    expect(obtenerOrdenPorId(9999)).toBeUndefined()
  })

  it('obtenerOrdenesPorUsuario filtra por RUN', () => {
    const ordenes = obtenerOrdenesPorUsuario('221231239')
    expect(ordenes.length).toBeGreaterThan(0)
    expect(ordenes.every((o) => o.runUsuario === '221231239')).toBeTrue()
  })
})