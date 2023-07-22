import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import cards from './cardsList'

function MoviesCardList() {
  return (
    <ul className='cards'>
      {cards.map(card => {
        return <MoviesCard card={card} key={card._id} />
      })}
    </ul>
  )
}

export default MoviesCardList
