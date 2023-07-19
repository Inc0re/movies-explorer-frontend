import './Promo.css'

function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <p className='promo__subtitle'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <a className='promo__link'>Узнать Больше</a>
      <img
        className='promo__logo'
        src='../../images/web-planet.svg'
        alt='Планета из слов WEB'
      />
    </section>
  )
}

export default Promo
