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
        <Route element={<LayoutTienda/>}>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/registro' element={<Registro />}/>
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path='productos' element={<AdminProductos />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App