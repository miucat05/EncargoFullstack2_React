import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CompraExitosa from './CompraExitosa'
import CompraError from './CompraError'

// Boleta con la forma que responde el backend
const boleta = {
  id: 7,
  usuarioId: 1,
  run: '211231239',
  cliente: 'Catalina Campos',
  correo: 'cata@gmail.com',
  fecha: '2026-11-22T10:00:00',
  estado: 'COMPLETADA',
  metodoPago: 'Tarjeta',
  total: 2000,
  calle: 'Los Crisantemos 123',
  departamento: null,
  region: 'Región Metropolitana de Santiago',
  comuna: 'Santiago',
  indicaciones: null,
  detalles: [
    { productoId: 1, nombre: 'Vinilo A', imagen: '/a.jpg', cantidad: 2, precioUnitario: 1000, subtotal: 2000 },
  ],
}

// mock: reemplaza fetch para que la prueba no llame al servidor real
function simularApi(cuerpo, status = 200) {
  return spyOn(window, 'fetch').and.callFake(() =>
    Promise.resolve(
      new Response(JSON.stringify(cuerpo), {
        status,
        headers: { 'Content-Type': 'application/json' },
      })
    )
  )
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

  it('CompraExitosa pide la boleta a la API y muestra el número, el cliente y la dirección', async () => {
    const espia = simularApi(boleta)
    mostrar('/compra/exitosa/7')

    expect(await screen.findByText(/nro #7/)).toBeTruthy()
    expect(screen.getByText('Catalina Campos')).toBeTruthy()
    expect(screen.getByText(/Los Crisantemos 123/)).toBeTruthy()
    expect(screen.getByText('Imprimir boleta en PDF')).toBeTruthy()
    expect(screen.getByText('Enviar boleta por email')).toBeTruthy()
    expect(espia.calls.mostRecent().args[0]).toContain('/api/v1/boletas/7')
  })

  it('estado: mientras llega la respuesta se muestra "Cargando compra..."', () => {
    // una promesa que nunca se resuelve deja la pantalla en estado de carga
    spyOn(window, 'fetch').and.returnValue(new Promise(() => {}))
    mostrar('/compra/exitosa/7')

    expect(screen.getByText('Cargando compra...')).toBeTruthy()
  })

  it('evento: "Enviar boleta por email" muestra la confirmación solo después del clic', async () => {
    simularApi(boleta)
    mostrar('/compra/exitosa/7')
    await screen.findByText('Enviar boleta por email')
    expect(screen.queryByText(/Boleta enviada a/)).toBeNull()

    fireEvent.click(screen.getByText('Enviar boleta por email'))
    expect(screen.getByText('Boleta enviada a cata@gmail.com.')).toBeTruthy()
  })

  it('evento: "Imprimir boleta en PDF" abre el diálogo de impresión', async () => {
    // mock: se reemplaza window.print para no abrir el diálogo real
    const espiaImprimir = spyOn(window, 'print')
    simularApi(boleta)
    mostrar('/compra/exitosa/7')
    await screen.findByText('Imprimir boleta en PDF')

    fireEvent.click(screen.getByText('Imprimir boleta en PDF'))
    expect(espiaImprimir).toHaveBeenCalledTimes(1)
  })

  it('CompraError muestra el aviso y el botón para reintentar el pago', async () => {
    simularApi({ ...boleta, estado: 'FALLIDA' })
    mostrar('/compra/error/7')

    expect(await screen.findByText(/No se pudo realizar el pago/)).toBeTruthy()
    expect(screen.getByText('Volver a realizar el pago').getAttribute('href')).toBe('/checkout')
  })

  it('renderizado condicional: una orden fallida no se puede ver como compra exitosa', async () => {
    simularApi({ ...boleta, estado: 'FALLIDA' })
    mostrar('/compra/exitosa/7')

    expect(await screen.findByText('Compra no encontrada')).toBeTruthy()
  })

  it('renderizado condicional: una orden inexistente (404) muestra "Compra no encontrada"', async () => {
    simularApi({ status: 404, message: 'Boleta no encontrada' }, 404)
    mostrar('/compra/error/9999')

    expect(await screen.findByText('Compra no encontrada')).toBeTruthy()
  })
})