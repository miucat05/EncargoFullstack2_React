import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Carrito from './Carrito'
import { CarritoProvider } from '../context/CarritoContext'

const items = [
  { id: 1, nombre: 'Vinilo A', precio: 1000, imagen: '/a.jpg', cantidad: 2 },
  { id: 2, nombre: 'Vinilo B', precio: 3000, imagen: '/b.jpg', cantidad: 1 },
]

// el carrito se carga desde localStorage, así que se prepara antes de montar
function mostrar(contenido = items) {
  localStorage.setItem('carrito', JSON.stringify(contenido))
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <Carrito />
      </CarritoProvider>
    </MemoryRouter>
  )
}

describe('Carrito (página)', () => {
  beforeEach(() => localStorage.clear())

  it('renderiza una fila por cada producto del carrito', () => {
    mostrar()
    expect(screen.getByText('Vinilo A')).toBeTruthy()
    expect(screen.getByText('Vinilo B')).toBeTruthy()
    expect(screen.getAllByRole('button', { name: 'Eliminar' }).length).toBe(2)
  })

  it('muestra el total del carrito (2 x 1.000 + 1 x 3.000 = 5.000)', () => {
    mostrar()
    expect(screen.getByRole('table').textContent).toContain('5.000')
  })

  it('renderizado condicional: con el carrito vacío muestra el aviso y no la tabla', () => {
    mostrar([])
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
    expect(screen.queryByRole('table')).toBeNull()
  })

  it('evento: el botón + aumenta la cantidad de un producto', () => {
    mostrar()
    fireEvent.click(screen.getByLabelText('Agregar una unidad de Vinilo B'))
    expect(screen.getByRole('table').textContent).toContain('6.000') // nuevo total
  })

  it('evento: el botón − en cantidad 1 elimina el producto', () => {
    mostrar()
    fireEvent.click(screen.getByLabelText('Quitar una unidad de Vinilo B'))
    expect(screen.queryByText('Vinilo B')).toBeNull()
  })

  it('evento: "Eliminar" quita el producto del carrito', () => {
    mostrar()
    fireEvent.click(screen.getAllByText('Eliminar')[0])
    expect(screen.queryByText('Vinilo A')).toBeNull()
    expect(screen.getByText('Vinilo B')).toBeTruthy()
  })

  it('evento: "Vaciar carrito" deja el carrito vacío', () => {
    mostrar()
    fireEvent.click(screen.getByText('Vaciar carrito'))
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
  })

  it('el botón "Comprar ahora" lleva al checkout', () => {
    mostrar()
    expect(screen.getByText('Comprar ahora').getAttribute('href')).toBe('/checkout')
  })
})