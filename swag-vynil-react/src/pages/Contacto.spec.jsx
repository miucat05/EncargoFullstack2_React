import { render, screen, fireEvent } from '@testing-library/react'
import Contacto from './Contacto'

function escribir(label, valor) {
  fireEvent.change(screen.getByLabelText(label), { target: { value: valor } })
}

describe('Contacto', () => {
  it('renderiza los tres campos y el botón de envío', () => {
    render(<Contacto />)
    expect(screen.getByLabelText('Nombre completo')).toBeTruthy()
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy()
    expect(screen.getByLabelText('Comentario')).toBeTruthy()
    expect(screen.getByText('ENVIAR MENSAJE')).toBeTruthy()
  })

  it('estado: el formulario refleja lo que escribe el usuario', () => {
    render(<Contacto />)
    escribir('Nombre completo', 'Catalina')
    expect(screen.getByLabelText('Nombre completo').value).toBe('Catalina')
  })

  it('renderizado condicional: los errores solo aparecen al enviar con datos inválidos', () => {
    render(<Contacto />)
    expect(screen.queryByText('El nombre es obligatorio.')).toBeNull()

    fireEvent.click(screen.getByText('ENVIAR MENSAJE'))
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy()
    expect(screen.getByText('El correo es obligatorio.')).toBeTruthy()
    expect(screen.getByText('El comentario es obligatorio.')).toBeTruthy()
  })

  it('rechaza un correo de dominio no permitido', () => {
    render(<Contacto />)
    escribir('Nombre completo', 'Catalina')
    escribir('Correo electrónico', 'cata@hotmail.com')
    escribir('Comentario', 'Hola')
    fireEvent.click(screen.getByText('ENVIAR MENSAJE'))
    expect(screen.getByText(/Solo se aceptan correos/)).toBeTruthy()
  })

  it('evento: con datos válidos muestra el mensaje de éxito y limpia el formulario', () => {
    render(<Contacto />)
    escribir('Nombre completo', 'Catalina')
    escribir('Correo electrónico', 'cata@gmail.com')
    escribir('Comentario', 'Quiero consultar por un vinilo')
    fireEvent.click(screen.getByText('ENVIAR MENSAJE'))

    expect(screen.getByText(/Mensaje enviado/)).toBeTruthy()
    expect(screen.getByLabelText('Nombre completo').value).toBe('')
  })
})