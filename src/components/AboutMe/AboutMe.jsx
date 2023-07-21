import './AboutMe.css'
import '../Section/Section.css'
import userPhoto from '../../images/user-photo.jpg'

function AboutMe() {
  return (
    <section className='about-me section'>
      <h3 className='about-me__title section__title'>Студент</h3>
      <p className='about-me__name'>Даниил</p>
      <p className='about-me__job'>Фронтенд-разработчик, 25 лет</p>
      <p className='about-me__description'>
        Я родился в Москве, сейчас живу в Алмате, закончил РТУ МИРЭА по
        специальности «Информационные системы и технологии». Кодил еще с
        универа, но около года назад понял, что хочу заниматься веб-разработкой
        и пошел на курс Практикума. С&nbsp;2017 работал в некоммерческой компании
        «Ассоциация онкологических пациентов «Здравствуй!» на должности
        технического руководителя. Сейчас нахожусь в поиске работы.
      </p>
      <a href='https://github.com/Inc0re' className='about-me__link'>
        Github
      </a>
      <img src={userPhoto} alt='Фото Даниила' className='about-me__photo' />
    </section>
  )
}

export default AboutMe
