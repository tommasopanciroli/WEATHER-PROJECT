import logo from './logo.svg'
import './App.css'
import CustomNavbar from './components/CustomNavbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar brand="Epi" claim="Meteo" className="mb-5" />
      </BrowserRouter>
    </div>
  )
}

export default App
