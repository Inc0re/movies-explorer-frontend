import './Header.css'

function Header() {
  return (
    <header className='header'>
      <div className='header__logo' />
      <nav className='header__links'>
        <a href='/signup' className='header__link'>
          Регистрация
        </a>
        <a href='/signin' className='header__link header__link_type_green-button'>
          Войти
        </a>
      </nav>
    </header>
  )
}

export default Header