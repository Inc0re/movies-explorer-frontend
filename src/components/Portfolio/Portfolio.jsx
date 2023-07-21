import './Portfolio.css'
import '../Section/Section.css'

function Portfolio() {
  return (
    <section className='portfolio section'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a href='/static' className='portfolio__link'>
            Статичный сайт
          </a>
          <div className='portfolio__list-arrow'>↗</div>
        </li>
        <li className='portfolio__list-item'>
          <a href='/adaptive' className='portfolio__link'>
            Адаптивный сайт
          </a>
          <div className='portfolio__list-arrow'>↗</div>
        </li>
        <li className='portfolio__list-item'>
          <a href='/spa' className='portfolio__link'>
            Одностраничное приложение
          </a>
          <div className='portfolio__list-arrow'>↗</div>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
