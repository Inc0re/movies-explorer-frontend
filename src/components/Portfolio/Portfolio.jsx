import './Portfolio.css'


function Portfolio() {
  return (
    <section className='portfolio section'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a
            href='https://inc0re.github.io/how-to-learn/'
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт
          <div className='portfolio__list-arrow'>↗</div>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://inc0re.github.io/russian-travel/'
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
          <div className='portfolio__list-arrow'>↗</div>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://mesto-app.nomoredomains.rocks'
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
          <div className='portfolio__list-arrow'>↗</div>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
