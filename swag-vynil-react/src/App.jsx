
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

function LayoutTienda() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

function App() {
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
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="usuarios/nuevo" element={<AdminUsuarioNuevo />} />
          <Route path="usuarios/:run/editar" element={<AdminUsuarioEditar />} />
          <Route path="perfil" element={<AdminPerfil />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="categorias/nueva" element={<AdminCategoriaForm />} />
          <Route path="categorias/editar/:id" element={<AdminCategoriaForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
