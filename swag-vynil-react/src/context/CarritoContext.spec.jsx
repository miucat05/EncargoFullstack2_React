import { render, screen, fireEvent } from '@testing-library/react'
import { CarritoProvider, useCarrito } from './CarritoContext'

const vinilo = { id: 1, nombre: 'Vinilo A', precio: 1000, imagen: '/a.jpg' }

// Componente de prueba que expone el contexto mediante botones
function Prueba() {
  const { items, total, cantidadTotal, agregar, quitar, cambiarCantidad, vaciar } = useCarrito()
  return (
    <div>
      <span data-testid="total">{total}</span>
      <span data-testid="cantidad">{cantidadTotal}</span>
      <span data-testid="lineas">{items.length}</span>
      <button onClick={() => agregar(vinilo)}>agregar</button>
      <button onClick={() => cambiarCantidad(1, 3)}>tres</button>
      <button onClick={() => cambiarCantidad(1, 0)}>cero</button>
      <button onClick={() => quitar(1)}>quitar</button>
      <button onClick={vaciar}>vaciar</button>
    </div>
  )
}

function mostrar() {
  return render(
    <CarritoProvider>
      <Prueba />
    </CarritoProvider>
  )
}

const leer = (id) => Number(screen.getByTestId(id).textContent)

describe('CarritoContext', () => {
  beforeEach(() => localStorage.clear())

  it('estado inicial: el carrito está vacío', () => {
    mostrar()
    expect(leer('lineas')).toBe(0)
    expect(leer('total')).toBe(0)
  })

  it('agregar un producto repetido suma la cantidad en vez de duplicar la línea', () => {
    mostrar()
    fireEvent.click(screen.getByText('agregar'))
    fireEvent.click(screen.getByText('agregar'))
    expect(leer('lineas')).toBe(1)
    expect(leer('cantidad')).toBe(2)
    expect(leer('total')).toBe(2000)
  })

  it('cambiarCantidad actualiza el total y una cantidad menor a 1 elimina la línea', () => {
    mostrar()
    fireEvent.click(screen.getByText('agregar'))
    fireEvent.click(screen.getByText('tres'))
    expect(leer('total')).toBe(3000)

    fireEvent.click(screen.getByText('cero'))
    expect(leer('lineas')).toBe(0)
  })

  it('quitar y vaciar eliminan productos del carrito', () => {
    mostrar()
    fireEvent.click(screen.getByText('agregar'))
    fireEvent.click(screen.getByText('quitar'))
    expect(leer('lineas')).toBe(0)

    fireEvent.click(screen.getByText('agregar'))
    fireEvent.click(screen.getByText('vaciar'))
    expect(leer('cantidad')).toBe(0)
  })

  it('persiste el carrito en localStorage y lo recupera al montar de nuevo', () => {
    const { unmount } = mostrar()
    fireEvent.click(screen.getByText('agregar'))
    unmount()

    mostrar()
    expect(leer('lineas')).toBe(1)
  })

  it('mock: si localStorage trae datos corruptos, arranca con el carrito vacío', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{esto no es json')
    mostrar()
    expect(leer('lineas')).toBe(0)
  })

  it('useCarrito lanza un error si se usa fuera del proveedor', () => {
    spyOn(console, 'error') // silencia el error esperado de React
    expect(() => render(<Prueba />)).toThrowError(/CarritoProvider/)
  })
})