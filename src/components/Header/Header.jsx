import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const location = useLocation()
  return (
    <header className={`header${location.pathname === '/' ? ' header_color_green' : ''}`}>
      <Link to='/' className='header__logo'>
        Главная
      </Link>
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
    </header>
  )
}

export default Header
