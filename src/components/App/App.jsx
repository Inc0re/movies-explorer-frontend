import { Route, Routes } from 'react-router-dom'
// import Header from '../Header/Header'
import FullPage from '../FullPage/FullPage'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
// import Footer from '../Footer/Footer'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<FullPage children={<Main />} />} />
        <Route path='/movies' element={<FullPage children={<Movies />} />} />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
