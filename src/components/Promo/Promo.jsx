import './Promo.css'
import planetImage from '../../images/web-planet.svg'

function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      <p className='promo__subtitle'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <a className='promo__link' href='/about'>
        Узнать Больше
      </a>
      <img
        className='promo__logo'
        src={planetImage}
        alt='Планета из слов WEB'
      />
    </section>
  )
}

export default Promo
