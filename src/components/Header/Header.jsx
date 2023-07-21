import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className='header'>
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
