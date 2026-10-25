import { render, screen, fireEvent } from '@testing-library/react'
import CampoContrasena from './CampoContrasena'

describe('CampoContrasena', () => {
  it('estado: oculta la contraseña al inicio', () => {
    render(<CampoContrasena label="Contraseña" id="clave" onChange={() => {}} value="" />)
    expect(screen.getByLabelText('Contraseña').type).toBe('password')
    expect(screen.getByText('Ver')).toBeTruthy()
  })

  it('evento: el botón alterna entre mostrar y ocultar', () => {
    render(<CampoContrasena label="Contraseña" id="clave" onChange={() => {}} value="" />)

    fireEvent.click(screen.getByText('Ver'))
    expect(screen.getByLabelText('Contraseña').type).toBe('text')
    expect(screen.getByText('Ocultar')).toBeTruthy()

    fireEvent.click(screen.getByText('Ocultar'))
    expect(screen.getByLabelText('Contraseña').type).toBe('password')
  })
})