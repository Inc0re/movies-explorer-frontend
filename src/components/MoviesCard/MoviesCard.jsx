import './MoviesCard.css'

function MoviesCard({ card, savedClass }) {
  const { nameRU, duration, image, isSaved} = card
  return (
    <li className='movie-card'>
      <div className='movie-card__header'>
        <h2 className='movie-card__title'>{nameRU}</h2>
        <p className='movie-card__length'>{`${duration} минут`}</p>
      </div>
      <img
        src={'https://api.nomoreparties.co' + image.url}
        alt={`Постер фильма ${nameRU}`}
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
