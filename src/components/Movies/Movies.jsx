import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Pagination from '../Pagination/Pagination'
import Preloader from '../Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm'

import './Movies.css'

function Movies({
  isSaved,
  currentState,
  filteredMovies,
  displayedMovies,
  searchQuery,
  tumblerState,
  pageText,
  handleSearch,
  handleTumblerSwitch,
  handleSearchQueryChange,
  handleLoadMore,
  handleMovieBtnClick,
  handleSearchOnKeyDown,
}) {
  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSearch}
        onTumblerSwitch={handleTumblerSwitch}
        tumblerState={tumblerState}
        onSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
        isSaved={isSaved}
        onKeyDown={handleSearchOnKeyDown}
      />
      <section>
        {currentState === 'loading' ? (
          <Preloader />
        ) : currentState === 'loaded' ? (
          <MoviesCardList
            isSaved={isSaved}
            cards={displayedMovies}
            onSave={handleMovieBtnClick}
          />
        ) : (
          <p className='movies__text'>{pageText}</p>
        )}
      </section>
      {!isSaved &&
        currentState === 'loaded' &&
        filteredMovies.length > displayedMovies.length && (
          <Pagination onLoadMore={handleLoadMore} />
        )}
    </main>
  )
}

export default Movies
