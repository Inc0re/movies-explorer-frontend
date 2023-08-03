import { useState, useEffect } from 'react'
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
import mainApi from '../../utils/MainApi'

function App() {
  const [apiError, setApiError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const handleRegister = data => {
    mainApi
      .register(data)
      .then(res => {
        setLoggedIn(true)
        setApiError('')
      })
      .catch(err => {
        console.log(err)
        setApiError(err.message)
      })
  }

  const handleLogin = data => {
    mainApi
      .login(data)
      .then(res => {
        setLoggedIn(true)
        setApiError('')
      })
      .catch(err => {
        console.log(err)
        setApiError(err.message)
      })
  }

  const handleLogout = () => {
    mainApi
      .logout()
      .then(res => {
        setLoggedIn(false)
        setApiError('')
      })
      .catch(err => {
        console.log(err)
        setApiError(err.message)
      })
  }

  const handleProfileUpdate = data => {
    mainApi
      .updateUserInfo(data)
      .then(res => {
        setCurrentUser(res)
        setApiError('')
      })
      .catch(err => {
        console.log(err)
        setApiError(err.message)
      })
  }

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then(res => {
        setCurrentUser(res.data)
        console.log(res.data)
        setLoggedIn(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [loggedIn])

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
                onLogout={handleLogout}
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
                handleRegister={handleRegister}
                apiError={apiError}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <ProtectedRoute
                path='/'
                loggedIn={!loggedIn}
                element={Login}
                handleLogin={handleLogin}
                apiError={apiError}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
