import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Fondo from '../src/assets/bg-login.png'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<div
  
>
  <div>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  </div>
</div>
)