
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import AdminLayout from './admin/AdminLayout'
import AdminHome from './admin/AdminHome'
import AdminProductos from './admin/AdminProductos'
import AdminUsuarios from './admin/AdminUsuarios'
import AdminUsuarioNuevo from './admin/AdminUsuarioNuevo'
import AdminUsuarioEditar from './admin/AdminUsuarioEditar'
import AdminPerfil from './admin/AdminPerfil'
import AdminCategorias from './admin/AdminCategorias'
import AdminCategoriaForm from './admin/AdminCategoriaForm'
import Categorias from './pages/Categorias'
import CategoriaDetalle from './pages/CategoriaDetalle'
import Ofertas from './pages/Ofertas'
import AdminOrdenes from './admin/AdminOrdenes'
import AdminBoleta from './admin/AdminBoleta'
import AdminUsuarioHistorial from './admin/AdminUsuarioHistorial'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Nosotros from './pages/Nosotros'
import Blog from './pages/Blog'
import DetalleBlog from './pages/DetalleBlog'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import CompraExitosa from './pages/CompraExitosa'
import CompraError from './pages/CompraError'
import AdminReportes from './admin/AdminReportes'
import { Navigate } from 'react-router-dom'
import RutaProtegida from './components/RutaProtegida'
import { obtenerSesion } from './data/usuariosService'
import { useEffect } from 'react'
import { renovarSesionSiCorresponde } from './api/renovacion'

function LayoutTienda() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function AdminInicio() {
  const sesion = obtenerSesion()
  return sesion?.rol === 'VENDEDOR'
    ? <Navigate to="/admin/ordenes" replace />
    : <AdminHome />
}

function App() {
  useEffect(() => {
    renovarSesionSiCorresponde()
    const intervalo = setInterval(renovarSesionSiCorresponde, 60_000)
    return () => clearInterval(intervalo)
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutTienda />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:categoria" element={<CategoriaDetalle />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Comprar requiere haber iniciado sesión */}
          <Route element={<RutaProtegida />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compra/exitosa/:id" element={<CompraExitosa />} />
            <Route path="/compra/error/:id" element={<CompraError />} />
          </Route>
        </Route>

        {/* Zona admin: Administrador y Vendedor */}
        <Route element={<RutaProtegida roles={['ADMINISTRADOR', 'VENDEDOR']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminInicio />} />

            {/* Administrador y Vendedor */}
            <Route path="ordenes" element={<AdminOrdenes />} />
            <Route path="ordenes/:id/boleta" element={<AdminBoleta />} />
            <Route path="productos" element={<AdminProductos />} />

            {/* Solo Administrador */}
            <Route element={<RutaProtegida roles={['ADMINISTRADOR']} />}>
              <Route path="usuarios" element={<AdminUsuarios />} />
              <Route path="usuarios/nuevo" element={<AdminUsuarioNuevo />} />
              <Route path="usuarios/:id/editar" element={<AdminUsuarioEditar />} />
              <Route path="usuarios/:id/historial" element={<AdminUsuarioHistorial />} />
              <Route path="perfil" element={<AdminPerfil />} />
              <Route path="categorias" element={<AdminCategorias />} />
              <Route path="categorias/nueva" element={<AdminCategoriaForm />} />
              <Route path="categorias/editar/:id" element={<AdminCategoriaForm />} />
              <Route path="reportes" element={<AdminReportes />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
