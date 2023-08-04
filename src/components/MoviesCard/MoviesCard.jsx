import './MoviesCard.css'

function MoviesCard({ card, savedClass, onSave, isSaved }) {
  const { nameRU, duration, image, trailerLink } = card

  function handleCardSave() {
    onSave(card)
  }

  function getDurationText() {
    if (duration < 60) {
      return `${duration} минут`
    } else {
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60
      return `${hours}ч ${minutes}м`
    }
  }

  return (
    <li className='movie-card'>
      <div className='movie-card__header'>
        <h2 className='movie-card__title'>{nameRU}</h2>
        <p className='movie-card__length'>{getDurationText()}</p>
      </div>
      <a
        href={trailerLink}
        className='movie-card__link'
        target='_blank'
        rel='noreferrer'
      >
        <img
          src={isSaved ? image : `https://api.nomoreparties.co${image.url}`}
          alt={`Постер фильма ${nameRU}`}
          className='movie-card__poster'
        />
      </a>
      <button
        className={`movie-card__button${isSaved ? ` ${savedClass}` : ''}`}
        type='button'
        onClick={handleCardSave}
      >
        {!isSaved && 'Сохранить'}
      </button>
    </li>
  )
}

export default MoviesCard
