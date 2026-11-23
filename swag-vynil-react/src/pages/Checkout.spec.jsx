import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Checkout from './Checkout'
import { CarritoProvider } from '../context/CarritoContext'

// Token de prueba con la forma de un JWT: cabecera.contenido.firma
function tokenDePrueba() {
  const contenido = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }))
  return `cabecera.${contenido}.firma`
}

const items = [{ id: 1, nombre: 'Vinilo A', precio: 1000, imagen: '/a.jpg', cantidad: 2 }]

// Boleta con la forma que responde el backend
function boleta(estado) {
  return {
    id: 7, usuarioId: 1, run: '211231239', cliente: 'Catalina Campos', correo: 'cata@gmail.com',
    fecha: '2026-11-22T10:00:00', estado, metodoPago: 'Tarjeta', total: 2000,
    calle: 'Los Crisantemos 123', departamento: null, region: 'R', comuna: 'C', indicaciones: null,
    detalles: [{ productoId: 1, nombre: 'Vinilo A', imagen: '/a.jpg', cantidad: 2, precioUnitario: 1000, subtotal: 2000 }],
  }
}

// mock: reemplaza fetch para que la prueba no llame al servidor real
function simularApi(cuerpo, status = 201) {
  return spyOn(window, 'fetch').and.callFake(() =>
    Promise.resolve(
      new Response(JSON.stringify(cuerpo), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    )
  )
}

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
      token: tokenDePrueba(),
      nombre: 'Javier', apellidos: 'Romero', correo: 'javier@gmail.com', direccion: 'Calle Falsa 123',
    }))
    mostrar()
    expect(screen.getByLabelText('Nombre').value).toBe('Javier')
    expect(screen.getByLabelText('Correo').value).toBe('javier@gmail.com')
    expect(screen.getByLabelText('Calle').value).toBe('Calle Falsa 123')
  })

  it('pago correcto: envía la boleta a la API, vacía el carrito y va a la vista de éxito', async () => {
    const espia = simularApi(boleta('COMPLETADA'))
    mostrar()
    completarFormulario()
    fireEvent.click(screen.getByText(/Pagar ahora/))

    expect(await screen.findByText('PAGO CORRECTO')).toBeTruthy()

    const [url, opciones] = espia.calls.mostRecent().args
    expect(url).toContain('/api/v1/boletas')
    expect(opciones.method).toBe('POST')
    const cuerpo = JSON.parse(opciones.body)
    // solo viajan ids y cantidades: el precio lo calcula el servidor
    expect(cuerpo.items).toEqual([{ productoId: 1, cantidad: 2 }])
    expect(cuerpo.pagoRechazado).toBe(false)
    expect(JSON.parse(localStorage.getItem('carrito')).length).toBe(0)
  })

  it('pago rechazado: envía pagoRechazado, conserva el carrito y va a la vista de error', async () => {
    const espia = simularApi(boleta('FALLIDA'))
    mostrar()
    completarFormulario()
    fireEvent.click(screen.getByLabelText(/Simular pago rechazado/))
    fireEvent.click(screen.getByText(/Pagar ahora/))

    expect(await screen.findByText('PAGO CON ERROR')).toBeTruthy()
    expect(JSON.parse(espia.calls.mostRecent().args[1].body).pagoRechazado).toBe(true)
    expect(JSON.parse(localStorage.getItem('carrito')).length).toBe(1)
  })

  it('error del servidor: si no hay stock muestra el mensaje y no sale del checkout', async () => {
    simularApi({ status: 409, message: 'Stock insuficiente de "Vinilo A" (quedan 1)' }, 409)
    mostrar()
    completarFormulario()
    fireEvent.click(screen.getByText(/Pagar ahora/))

    expect(await screen.findByText(/Stock insuficiente de "Vinilo A"/)).toBeTruthy()
    expect(screen.queryByText('PAGO CORRECTO')).toBeNull()
    expect(JSON.parse(localStorage.getItem('carrito')).length).toBe(1)
  })
})