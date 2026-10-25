import { obtenerBlogs, obtenerBlogPorId } from './blogs'

describe('data/blogs', () => {
  it('entrega los dos artículos del blog', () => {
    expect(obtenerBlogs().length).toBe(2)
  })

  it('busca un artículo por id, aunque el id llegue como texto (parámetro de la URL)', () => {
    expect(obtenerBlogPorId('1').id).toBe(1)
    expect(obtenerBlogPorId(2).categoria).toBe('Dato curioso')
  })

  it('devuelve null si el artículo no existe', () => {
    expect(obtenerBlogPorId(99)).toBeNull()
  })
})