import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
import InfoTooltip from '../InfoTooltip/InfoTooltip'

function App() {
  const navigate = useNavigate()

  const [apiError, setApiError] = useState('')
  const [isWaitingRes, setIsWaitingRes] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)
  const [currentUser, setCurrentUser] = useState({})

  // tooltip states and functions
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState('')
  const handleTooltip = (isSuccess, message) => {
    setIsTooltipOpen(true)
    setIsTooltipSuccess(isSuccess)
    setTooltipMessage(message)
  }

  const handleRegister = data => {
    setIsWaitingRes(true)
    mainApi
      .register(data)
      .then(() => {
        // авторизовать пользователя
        handleLogin({
          email: data.email,
          password: data.password,
        })
      })
      .then(() => {
        navigate('/movies')
      })
      .catch(err => {
        console.log(err)
        setApiError(err.message)
      })
      .finally(() => {
        setIsWaitingRes(false)
      })
  }

  const handleLogin = data => {
    setIsWaitingRes(true)
    mainApi
      .login(data)
      .then(res => {
        setLoggedIn(true)
        setApiError('')
        navigate('/movies')
      })
      .catch(err => {
        console.log(err)
        setApiError(err.message)
      })
      .finally(() => {
        setIsWaitingRes(false)
      })
  }

  const handleLogout = () => {
    setIsWaitingRes(true)
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
      .finally(() => {
        setIsWaitingRes(false)
      })

    localStorage.removeItem('savedSearch')
  }

  const handleProfileUpdate = data => {
    setIsWaitingRes(true)
    mainApi
      .updateUserInfo(data)
      .then(res => {
        setCurrentUser(res)
        handleTooltip(true, 'Данные успешно обновлены')
      })
      .catch(err => {
        handleTooltip(
          false,
          err.message === 'Validation failed'
            ? 'Некорректно заполнено одно из полей'
            : err.message
        )
        console.log(err)
      })
      .finally(() => {
        setIsWaitingRes(false)
      })
  }

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then(res => {
          setCurrentUser(res.data)
          // console.log(res.data)
          setLoggedIn(true)
        })
        .catch(err => {
          console.log(err)
          setLoggedIn(false)
        })
    }
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
                isWaitingRes={isWaitingRes}
                setIsWaitingRes={setIsWaitingRes}
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
                isWaitingRes={isWaitingRes}
                setIsWaitingRes={setIsWaitingRes}
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
                onProfileUpdate={handleProfileUpdate}
                isWaitingRes={isWaitingRes}
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
                setApiError={setApiError}
                isWaitingRes={isWaitingRes}
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
                setApiError={setApiError}
                isWaitingRes={isWaitingRes}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <InfoTooltip
          isOpened={isTooltipOpen}
          isSuccess={isTooltipSuccess}
          setIsPopupOpened={setIsTooltipOpen}
          message={tooltipMessage}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
