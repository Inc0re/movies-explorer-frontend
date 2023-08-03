import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'
import './App.css'
import MainPage from '../MainPage/MainPage'
import MoviesPage from '../MoviesPage/MoviesPage'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import ProfilePage from '../ProfilePage/ProfilePage'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<MainPage loggedIn={loggedIn} />} />
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
                element={MoviesPage}
                isSaved={true}
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
