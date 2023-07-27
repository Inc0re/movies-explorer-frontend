import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__copyright'>© 2020</div>
      <ul className='footer__links'>
        <li className='footer__list-item'>
          <a
            href='https://practicum.yandex.ru'
            className='footer__link'
            target='_blank'
            rel='noreferrer'
          >
            Яндекс.Практикум
          </a>
        </li>
        <li className='footer__list-item'>
          <a
            href='https://github.com/Inc0re'
            className='footer__link'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
