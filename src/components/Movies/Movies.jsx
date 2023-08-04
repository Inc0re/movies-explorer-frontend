import React, { useState, useEffect } from 'react'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Pagination from '../Pagination/Pagination'
import Preloader from '../Preloader/Preloader'
import SearchForm from '../SearchForm/SearchForm'
import moviesApi from '../../utils/MoviesApi'
import { filterByDuration, filterByTitle } from '../../utils/moviesFilters'
import './Movies.css'

function Movies({ isSaved }) {
  const [pageText, setPageText] = useState('Введите поисковый запрос')
  const [currentState, setCurrentState] = useState('')
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [displayedMovies, setDisplayedMovies] = useState([])
  const [tumblerState, setTumblerState] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // при монтировании компонента проверяем, есть ли сохраненные результаты поиска в localStorage
  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem('savedSearch'))
    if (savedSearch) {
      setCurrentState(savedSearch.currentState)
      setMovies(savedSearch.movies)
      setFilteredMovies(savedSearch.filteredMovies)
      setDisplayedMovies(savedSearch.displayedMovies)
      setSearchQuery(savedSearch.searchQuery)
      setTumblerState(savedSearch.tumblerState)
    } else {
      moviesApi
        .getMovies()
        .then(res => {
          setMovies(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  // при переключении тумблера вызываем поиск
  useEffect(() => {
    if (currentState === 'loaded') {
      searchMovies()
    }
  }, [tumblerState])

  function handleSearch(e) {
    e.preventDefault()
    searchMovies()
  }

  function handleTumblerSwitch() {
    setTumblerState(!tumblerState)
  }

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value)
  }

  function calcInitialMovies() {
    const windowWidth = window.innerWidth
    if (windowWidth > 1074) {
      return 12
    } else if (windowWidth > 682) {
      return 8
    } else {
      return 5
    }
  }

  function calcMoviesToLoad() {
    const windowWidth = window.innerWidth
    if (windowWidth > 1074) {
      return 3
    } else {
      return 2
    }
  }

  function handleLoadMore() {
    const moviesToLoad = calcMoviesToLoad()
    const moviesLeft = filteredMovies.length - displayedMovies.length
    if (moviesLeft > moviesToLoad) {
      setDisplayedMovies([
        ...displayedMovies,
        ...filteredMovies.slice(
          displayedMovies.length,
          displayedMovies.length + moviesToLoad
        ),
      ])
    } else {
      setDisplayedMovies([
        ...displayedMovies,
        ...filteredMovies.slice(displayedMovies.length, filteredMovies.length),
      ])
    }
  }

  function handleMovieSave(e) {

  }

  // главная функция поиска фильмов
  function searchMovies() {
    // ставим прелоадер
    setCurrentState('loading')
    // фильтруем фильмы по имени
    let filteredMovies = filterByTitle(movies, searchQuery)

    // если включен тумблер, фильтруем еще и по длительности
    if (tumblerState) {
      filteredMovies = filterByDuration(filteredMovies, 40)
    }
    console.log('Найдено: ' + filteredMovies.length)
    // если ничего не найдено, ставим соответствующий текст
    if (filteredMovies.length === 0) {
      setPageText('Ничего не найдено')
      setCurrentState('')
    } else {
      // иначе:
      // 1. добавляем результат в стейт отфильтрованных фильмов
      // 2. добавляем в стейт отображаемых фильмов нужое количество относительно ширины экрана
      // 3. меняем стейт на 'loaded'
      // 4. сохраняем результаты поиска в localStorage
      setFilteredMovies(filteredMovies)
      setDisplayedMovies(filteredMovies.slice(0, calcInitialMovies()))
      setCurrentState('loaded')
      localStorage.setItem(
        'savedSearch',
        JSON.stringify({
          currentState: 'loaded',
          movies: movies,
          filteredMovies,
          displayedMovies,
          searchQuery,
          tumblerState,
        })
      )
    }
  }

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSearch}
        onTumblerSwitch={handleTumblerSwitch}
        tumblerState={tumblerState}
        onSearchQueryChange={handleSearchQueryChange}
        searchQuery={searchQuery}
      />
      <section>
        {currentState === 'loading' ? (
          <Preloader />
        ) : currentState === 'loaded' ? (
          <MoviesCardList isSaved={isSaved} cards={displayedMovies} onSave={handleMovieSave} />
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
