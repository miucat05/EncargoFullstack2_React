import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/main.css'
import App from './App.jsx'
import { CarritoProvider } from './context/CarritoContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
     <App /> 
    </CarritoProvider>
  </StrictMode>,
)