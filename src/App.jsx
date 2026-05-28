import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import './index.css'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'

function App() {
  return(
    <BrowserRouter>
      <div>
        <Navbar/>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/catalogo' element={<Catalog/>}/>
            <Route path='/produto/:id' element={<ProductDetail/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
