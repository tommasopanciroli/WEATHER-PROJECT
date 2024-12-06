import './App.css'
import CustomNavbar from './components/CustomNavbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainContent from './components/MainContent'
import MyFooter from './components/MyFooter'
import NotFound from './components/NotFound'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar className="mb-5" />
        <Routes>
          <Route
            path="/"
            element={
              <MainContent className="mt-5" fontSize="fs-1" textSize="fs-5" />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <MyFooter />
    </div>
  )
}

export default App
