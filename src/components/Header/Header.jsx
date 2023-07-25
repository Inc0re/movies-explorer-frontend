import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header({ loggedIn }) {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState('')

  const setActiveClass = (linkPath) => {
    return (
      'header__link header__link_authorized' +
      (currentPage === linkPath ? ' header__link_active' : '')
    )
  }

  useEffect(() => {
    setCurrentPage(location.pathname)
  }, [location])

  return (
    <header
      className={`header${currentPage === '/' ? ' header_color_green' : ''}`}
    >
      <Link to='/' className='header__logo'>
        Главная
      </Link>
      {loggedIn ? (
        <nav className='header__links header__links_authorized'>
          <Link to='/movies' className={setActiveClass('/movies')}>
            Фильмы
          </Link>
          <Link to='/saved-movies' className={setActiveClass('/saved-movies')}>
            Сохранённые фильмы
          </Link>
          <Link
            to='/profile'
            className={
              setActiveClass('/profile') + ' header__link_type_account'
            }
          >
            Аккаунт
            <div className='header__profile-icon' />
          </Link>
        </nav>
      ) : (
        <nav className='header__links'>
          <Link to='/sign-up' className='header__link'>
            Регистрация
          </Link>
          <Link
            to='/sign-in'
            className='header__link header__link_type_green-button'
          >
            Войти
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
