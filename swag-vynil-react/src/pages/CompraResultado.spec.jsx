import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CompraExitosa from './CompraExitosa'
import CompraError from './CompraError'
import { crearOrden } from '../data/ordenes'

const datosOrden = {
  cliente: 'Catalina Campos',
  correo: 'cata@gmail.com',
  productos: [{ nombre: 'Vinilo A', cantidad: 2, precio: 1000 }],
  metodoPago: 'Tarjeta',
  entrega: { calle: 'Los Crisantemos 123', comuna: 'Santiago', region: 'Región Metropolitana de Santiago' },
}

function mostrar(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/compra/exitosa/:id" element={<CompraExitosa />} />
        <Route path="/compra/error/:id" element={<CompraError />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Vistas de resultado del pago', () => {
  beforeEach(() => localStorage.clear())

  it('CompraExitosa muestra el número de orden, el cliente y la dirección', () => {
    const orden = crearOrden({ ...datosOrden, estado: 'Completada' })
    mostrar(`/compra/exitosa/${orden.id}`)

    expect(screen.getByText(new RegExp(`nro #${orden.id}`))).toBeTruthy()
    expect(screen.getByText('Catalina Campos')).toBeTruthy()
    expect(screen.getByText(/Los Crisantemos 123/)).toBeTruthy()
    expect(screen.getByText('Imprimir boleta en PDF')).toBeTruthy()
    expect(screen.getByText('Enviar boleta por email')).toBeTruthy()
  })

  it('evento: "Enviar boleta por email" muestra la confirmación solo después del clic', () => {
    const orden = crearOrden({ ...datosOrden, estado: 'Completada' })
    mostrar(`/compra/exitosa/${orden.id}`)
    expect(screen.queryByText(/Boleta enviada a/)).toBeNull()

    fireEvent.click(screen.getByText('Enviar boleta por email'))
    expect(screen.getByText('Boleta enviada a cata@gmail.com.')).toBeTruthy()
  })

  it('evento: "Imprimir boleta en PDF" abre el diálogo de impresión', () => {
    // mock: se reemplaza window.print para no abrir el diálogo real
    const espia = spyOn(window, 'print')
    const orden = crearOrden({ ...datosOrden, estado: 'Completada' })
    mostrar(`/compra/exitosa/${orden.id}`)

    fireEvent.click(screen.getByText('Imprimir boleta en PDF'))
    expect(espia).toHaveBeenCalledTimes(1)
  })

  it('CompraError muestra el aviso y el botón para reintentar el pago', () => {
    const orden = crearOrden({ ...datosOrden, estado: 'Fallida' })
    mostrar(`/compra/error/${orden.id}`)

    expect(screen.getByText(/No se pudo realizar el pago/)).toBeTruthy()
    expect(screen.getByText('Volver a realizar el pago').getAttribute('href')).toBe('/checkout')
  })

  it('renderizado condicional: una orden fallida no se puede ver como compra exitosa', () => {
    const orden = crearOrden({ ...datosOrden, estado: 'Fallida' })
    mostrar(`/compra/exitosa/${orden.id}`)
    expect(screen.getByText('Compra no encontrada')).toBeTruthy()
  })

  it('renderizado condicional: una orden inexistente muestra "Compra no encontrada"', () => {
    mostrar('/compra/error/9999')
    expect(screen.getByText('Compra no encontrada')).toBeTruthy()
  })
})