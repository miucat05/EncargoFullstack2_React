import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'
import { CarritoProvider } from '../context/CarritoContext'

const producto = { id: 7, nombre: 'Taylor Swift - 1989', precio: 25990, imagen: '/images/TAYLOR1.webp' }

function mostrar(prod) {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <ProductCard producto={prod} />
      </CarritoProvider>
    </MemoryRouter>
  )
}

describe('ProductCard', () => {
  beforeEach(() => localStorage.clear())

  it('renderiza el nombre, el precio y el enlace al detalle', () => {
    mostrar(producto)
    const enlace = screen.getByText('Taylor Swift - 1989')
    expect(enlace.getAttribute('href')).toBe('/productos/7')
    expect(screen.getByText(/25\.990/)).toBeTruthy()
  })

  it('renderizado condicional: muestra la etiqueta de descuento solo en ofertas', () => {
    mostrar(producto)
    expect(screen.queryByText('-20%')).toBeNull()

    mostrar({ ...producto, id: 8, descuento: 20, precioOriginal: 32487 })
    expect(screen.getByText('-20%')).toBeTruthy()
  })

  it('evento: al presionar "Añadir" guarda el producto en el carrito (localStorage)', () => {
    // mock: se espía localStorage.setItem para verificar la persistencia
    const espia = spyOn(Storage.prototype, 'setItem').and.callThrough()
    mostrar(producto)

    fireEvent.click(screen.getByText('Añadir'))

    const guardado = espia.calls.allArgs().filter(([clave]) => clave === 'carrito').pop()
    const items = JSON.parse(guardado[1])
    expect(items.length).toBe(1)
    expect(items[0].id).toBe(7)
    expect(items[0].cantidad).toBe(1)
  })
})