import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import cards from './cardsList'

function MoviesCardList({ isSaved }) {
  return (
    <ul className='cards'>
      {isSaved ? (
        cards.filter(card => card.isSaved).map(card => {
          return (
            <MoviesCard
              card={card}
              key={card._id}
              savedClass={'movie-card__button_remove'}
            />
          )
        })
      ) : (
        cards.map(card => {
          return (
            <MoviesCard
              card={card}
              key={card._id}
              savedClass={'movie-card__button_saved'}
            />
          )
        })
      )}
    </ul>
  )
}

export default MoviesCardList
