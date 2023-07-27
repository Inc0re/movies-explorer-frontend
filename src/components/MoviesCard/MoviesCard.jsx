import './MoviesCard.css'

function MoviesCard({ card, savedClass }) {
  const { title, isSaved, link, length } = card
  return (
    <li className='movie-card'>
      <div className='movie-card__header'>
        <h2 className='movie-card__title'>{title}</h2>
        <p className='movie-card__length'>{`${length} минут`}</p>
      </div>
      <img
        src={link}
        alt={`Постер фильма ${title}`}
        className='movie-card__poster'
      />
      <button
        className={`movie-card__button${isSaved ? ` ${savedClass}` : ''}`}
        type='button'
      >
        {!isSaved && 'Сохранить'}
      </button>
    </li>
  )
}

export default MoviesCard
