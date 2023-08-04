import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
// import cards from './cardsList'

function MoviesCardList({ isSaved, cards, onSave }) {
  return (
    <ul className={'cards' + (isSaved ? ' cards_padding_bottom' : '')}>
      {cards.map(card => {
        return (
          <MoviesCard
            card={card}
            key={isSaved ? card.movieId : card.id}
            savedClass={
              isSaved
                ? 'movie-card__button_saved'
                : 'movie-card__button_remove'
            }
            onSave={onSave}
            isSaved={isSaved}
          />
        )
      })}
    </ul>
  )
}

export default MoviesCardList
