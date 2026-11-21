import { render, screen, fireEvent } from '@testing-library/react'
import CampoFormulario from './CampoFormulario'

describe('CampoFormulario', () => {
  it('renderiza la etiqueta asociada al campo', () => {
    render(<CampoFormulario label="Nombre" id="nombre" onChange={() => {}} value="" />)
    expect(screen.getByLabelText('Nombre')).toBeTruthy()
  })

  it('renderizado condicional: marca el campo como inválido y muestra el error solo si hay error', () => {
    const { rerender } = render(
      <CampoFormulario label="Nombre" id="nombre" onChange={() => {}} value="" />
    )
    expect(screen.getByLabelText('Nombre').classList.contains('is-invalid')).toBeFalse()

    rerender(
      <CampoFormulario label="Nombre" id="nombre" error="Campo obligatorio" onChange={() => {}} value="" />
    )
    expect(screen.getByLabelText('Nombre').classList.contains('is-invalid')).toBeTrue()
    expect(screen.getByText('Campo obligatorio')).toBeTruthy()
  })

  it('props: recibe el valor y ejecuta onChange al escribir', () => {
    const alCambiar = jasmine.createSpy('onChange')
    render(<CampoFormulario label="Nombre" id="nombre" value="" onChange={alCambiar} />)

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Cata' } })
    expect(alCambiar).toHaveBeenCalledTimes(1)
  })

  it('puede renderizarse como textarea o select', () => {
    render(<CampoFormulario label="Comentario" id="comentario" as="textarea" onChange={() => {}} value="" />)
    expect(screen.getByLabelText('Comentario').tagName).toBe('TEXTAREA')
  })
})