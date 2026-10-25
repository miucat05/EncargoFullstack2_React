import { formatoPrecio } from './formato'

describe('formatoPrecio', () => {
  it('formatea un número como pesos chilenos sin decimales', () => {
    const texto = formatoPrecio(25990)
    expect(texto).toContain('25.990')
    expect(texto).toContain('$')
  })

  it('formatea el cero', () => {
    expect(formatoPrecio(0)).toContain('0')
  })
})