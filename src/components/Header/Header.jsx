import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import '../BurgerMenu/BurgerMenu.css'

function Header({ loggedIn, onBurgerClick }) {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState('')
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  const handleBurgerMenuClick = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }

  const setActiveClass = linkPath => {
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
        <>
          <div className='burger'>
            <input
              className='burger__checkbox'
              type='checkbox'
              id='burger__checkbox'
              name='burger__checkbox'
              checked={isBurgerMenuOpen}
              onChange={handleBurgerMenuClick}
            />
            <label className='burger__btn' htmlFor='burger__checkbox'>
              <span className='burger__line' />
            </label>
          </div>
          <div
            className={
              'header__container' +
              (isBurgerMenuOpen ? ' header__container_active' : '')
            }
          >
            <nav className='header__links header__links_authorized'>
              <Link
                to='/'
                className={setActiveClass('/') + ' header__link_type_home'}
              >
                Главная
              </Link>
              <Link to='/movies' className={setActiveClass('/movies')}>
                Фильмы
              </Link>
              <Link
                to='/saved-movies'
                className={setActiveClass('/saved-movies')}
              >
                Сохранённые фильмы
              </Link>
              <Link
                to='/profile'
                className='header__link header__link_type_account'
              >
                Аккаунт
                <div className='header__profile-icon' />
              </Link>
            </nav>
          </div>
        </>
      ) : (
        <nav className='header__links'>
          <Link to='/signup' className='header__link'>
            Регистрация
          </Link>
          <Link
            to='/signin'
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
