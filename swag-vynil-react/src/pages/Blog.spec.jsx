import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Blog from './Blog'
import DetalleBlog from './DetalleBlog'

describe('Blog', () => {
  it('renderiza un artículo por cada elemento de los datos, con su enlace al detalle', () => {
    render(<MemoryRouter><Blog /></MemoryRouter>)
    const enlaces = screen.getAllByText('VER CASO')
    expect(enlaces.length).toBe(2)
    expect(enlaces[0].getAttribute('href')).toBe('/blog/1')
    expect(enlaces[1].getAttribute('href')).toBe('/blog/2')
  })
})

describe('DetalleBlog', () => {
  function mostrar(ruta) {
    return render(
      <MemoryRouter initialEntries={[ruta]}>
        <Routes>
          <Route path="/blog/:id" element={<DetalleBlog />} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('lee el id de la URL y muestra el artículo correspondiente', () => {
    mostrar('/blog/2')
    expect(screen.getByText(/¿Por qué los vinilos son originalmente transparentes\?/)).toBeTruthy()
  })

  it('renderizado condicional: muestra un mensaje si el artículo no existe', () => {
    mostrar('/blog/99')
    expect(screen.getByText('Artículo no encontrado')).toBeTruthy()
  })
})