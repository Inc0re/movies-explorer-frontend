import './AboutProject.css'

function AboutProject() {
  return (
    <section className='about section'>
      <h2 className='about__title section__title'>О проекте</h2>
      <div className='about__info'>
        <div className='about__column'>
          <h3 className='about__column-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about__column-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about__column'>
          <h3 className='about__column-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about__column-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about__progress'>
        <div className='about__progress-column'>
          <p className='about__progress-column-text about__progress-column-text_green'>
            1 неделя
          </p>
        </div>
        <div className='about__progress-column'>
          <p className='about__progress-column-text'>4 недели</p>
        </div>
      </div>
      <div className='about__progress'>
        <div className='about__progress-column'>
          <p className='about__progress-column-caption'>Back-end</p>
        </div>
        <div className='about__progress-column'>
          <p className='about__progress-column-caption'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject
