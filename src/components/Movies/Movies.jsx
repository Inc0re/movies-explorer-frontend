import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Pagination from '../Pagination/Pagination'
import Preloader from '../Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm'
import './Movies.css'

function Movies() {
  return (
    <main className='movies'>
      <SearchForm/>
      <MoviesCardList/>
      {/* <Preloader/> */}
      <Pagination/>
    </main>
  )
}

export default Movies