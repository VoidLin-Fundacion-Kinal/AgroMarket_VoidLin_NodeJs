
import { useRoutes } from 'react-router-dom'
import {routes} from '../routes'
import Fondo from '../src/assets/bg-login.png'
import '../styles.css'


function App() {

const elemento = useRoutes(routes)
  

return (
    <div className="relative min-h-screen">
  {/* Fondo desenfocado */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-xs "
    style={{ backgroundImage: `url(${Fondo})`, zIndex: -1 }}
  ></div>

  {/* Contenido visible encima */}
  <div className="relative z-10">
    {elemento}
  </div>
</div>
  )
}

export default App
