import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { ProveedorConciertos } from './estado/ProveedorConciertos.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProveedorConciertos>
        <App />
      </ProveedorConciertos>
    </BrowserRouter>
  </StrictMode>,
)
