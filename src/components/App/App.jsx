import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
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
import MainPage from '../MainPage/MainPage'
import MoviesPage from '../MoviesPage/MoviesPage'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import ProfilePage from '../ProfilePage/ProfilePage'

function App() {
  const [loggedIn, setLoggedIn] = useState(true)
  const [currentUser, setCurrentUser] = useState({})

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                path='/'
                loggedIn={loggedIn}
                element={MoviesPage}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                path='/'
                loggedIn={loggedIn}
                element={
                  <ProtectedRoute
                    path='/'
                    loggedIn={loggedIn}
                    isSaved={true}
                    element={MoviesPage}
                  />
                }
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                path='/'
                loggedIn={loggedIn}
                element={ProfilePage}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <ProtectedRoute
                path='/'
                loggedIn={!loggedIn}
                element={Register}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <ProtectedRoute path='/' loggedIn={!loggedIn} element={Login} />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
