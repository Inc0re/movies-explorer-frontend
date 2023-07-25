import { Route, Routes } from 'react-router-dom'
// import FullPage from '../FullPage/FullPage'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
// import Footer from '../Footer/Footer'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path='/movies'
          element={
            <>
              <Header loggedIn={true} />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path='/saved-movies'
          element={
            <>
              <Header loggedIn={true} />
              <Movies isSaved={true} />
              <Footer />
            </>
          }
        />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/sign-in' element={<Login />} />
        <Route
          path='/profile'
          element={
            <>
              <Header loggedIn={true} />
              <Profile />
            </>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
