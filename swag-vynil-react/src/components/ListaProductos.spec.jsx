import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ListaProductos from './ListaProductos'
import { CarritoProvider } from '../context/CarritoContext'

const productos = [
  { id: 1, nombre: 'Vinilo A', precio: 1000, imagen: '/a.jpg' },
  { id: 2, nombre: 'Vinilo B', precio: 2000, imagen: '/b.jpg' },
  { id: 3, nombre: 'Vinilo C', precio: 3000, imagen: '/c.jpg' },
]

function mostrar(props) {
  return render(
    <MemoryRouter>
      <CarritoProvider>
        <ListaProductos {...props} />
      </CarritoProvider>
    </MemoryRouter>
  )
}

describe('ListaProductos', () => {
  it('renderiza todos los elementos del conjunto de datos', () => {
    mostrar({ productos })
    expect(screen.getAllByRole('button', { name: 'Añadir' }).length).toBe(3)
    expect(screen.getByText('Vinilo A')).toBeTruthy()
    expect(screen.getByText('Vinilo C')).toBeTruthy()
  })

  it('renderizado condicional: con lista vacía muestra el mensaje y no la grilla', () => {
    mostrar({ productos: [], mensajeVacio: 'Sin resultados' })
    expect(screen.getByText('Sin resultados')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Añadir' })).toBeNull()
  })
})