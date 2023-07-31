import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Pagination from '../Pagination/Pagination'
// import Preloader from '../Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm'
import './Movies.css'

function Movies({ isSaved }) {
  return (
    <main className='movies'>
      <SearchForm />
      <section>
        <MoviesCardList isSaved={isSaved} />
      </section>
      {/* <Preloader/> */}
      {!isSaved && <Pagination />}
    </main>
  )
}

export default Movies
