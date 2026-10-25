import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Checkout from './Checkout'
import { CarritoProvider } from '../context/CarritoContext'
import { obtenerOrdenes } from '../data/ordenes'

const items = [{ id: 1, nombre: 'Vinilo A', precio: 1000, imagen: '/a.jpg', cantidad: 2 }]

function mostrar(carrito = items) {
  localStorage.setItem('carrito', JSON.stringify(carrito))
  return render(
    <MemoryRouter initialEntries={['/checkout']}>
      <CarritoProvider>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra/exitosa/:id" element={<p>PAGO CORRECTO</p>} />
          <Route path="/compra/error/:id" element={<p>PAGO CON ERROR</p>} />
        </Routes>
      </CarritoProvider>
    </MemoryRouter>
  )
}

const escribir = (label, valor) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value: valor } })

function completarFormulario() {
  escribir('Nombre', 'Catalina')
  escribir('Apellidos', 'Campos')
  escribir('Correo', 'cata@gmail.com')
  escribir('Calle', 'Los Crisantemos 123')
  escribir('Región', 'Región Metropolitana de Santiago')
  escribir('Comuna', 'Santiago')
}

describe('Checkout', () => {
  beforeEach(() => localStorage.clear())

  it('renderiza el resumen de la compra y el total a pagar', () => {
    mostrar()
    expect(screen.getByText('Vinilo A')).toBeTruthy()
    expect(screen.getByText(/Total a pagar/).textContent).toContain('2.000')
  })

  it('renderizado condicional: sin productos muestra un aviso en vez del formulario', () => {
    mostrar([])
    expect(screen.getByText('No hay productos para pagar')).toBeTruthy()
    expect(screen.queryByLabelText('Nombre')).toBeNull()
  })

  it('al enviar vacío muestra los errores de los campos obligatorios', () => {
    mostrar()
    fireEvent.click(screen.getByText(/Pagar ahora/))
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy()
    expect(screen.getByText('Los apellidos son obligatorios.')).toBeTruthy()
    expect(screen.getByText('La calle es obligatoria.')).toBeTruthy()
    expect(screen.getByText('Seleccione una región.')).toBeTruthy()
  })

  it('estado: las comunas dependen de la región elegida', () => {
    mostrar()
    expect(screen.queryByRole('option', { name: 'Temuco' })).toBeNull()

    escribir('Región', 'Región de la Araucanía')
    expect(screen.getByRole('option', { name: 'Temuco' })).toBeTruthy()
    expect(screen.queryByRole('option', { name: 'Santiago' })).toBeNull()
  })

  it('si hay sesión iniciada, los datos del cliente se completan automáticamente', () => {
    localStorage.setItem('sesion', JSON.stringify({
      nombre: 'Javier', apellidos: 'Romero', correo: 'javier@gmail.com', direccion: 'Calle Falsa 123',
    }))
    mostrar()
    expect(screen.getByLabelText('Nombre').value).toBe('Javier')
    expect(screen.getByLabelText('Correo').value).toBe('javier@gmail.com')
    expect(screen.getByLabelText('Calle').value).toBe('Calle Falsa 123')
  })

  it('pago correcto: crea la orden "Completada", vacía el carrito y va a la vista de éxito', () => {
    mostrar()
    completarFormulario()
    fireEvent.click(screen.getByText(/Pagar ahora/))

    expect(screen.getByText('PAGO CORRECTO')).toBeTruthy()
    const ultima = obtenerOrdenes().pop()
    expect(ultima.estado).toBe('Completada')
    expect(ultima.cliente).toBe('Catalina Campos')
    expect(JSON.parse(localStorage.getItem('carrito')).length).toBe(0)
  })

  it('pago rechazado: crea la orden "Fallida", conserva el carrito y va a la vista de error', () => {
    mostrar()
    completarFormulario()
    fireEvent.click(screen.getByLabelText(/Simular pago rechazado/))
    fireEvent.click(screen.getByText(/Pagar ahora/))

    expect(screen.getByText('PAGO CON ERROR')).toBeTruthy()
    expect(obtenerOrdenes().pop().estado).toBe('Fallida')
    expect(JSON.parse(localStorage.getItem('carrito')).length).toBe(1)
  })
})