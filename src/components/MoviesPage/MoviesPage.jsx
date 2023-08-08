import React, { useState, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import moviesApi from '../../utils/MoviesApi'
import mainApi from '../../utils/MainApi'
import {
  loadMore,
  updateMoviesIfSaved,
  filterByTitle,
  filterByDuration,
  calcInitialMovies,
} from '../../utils/moviesFilters'

function MoviesPage({ loggedIn, isSaved }) {
  // стейты для /movies
  const [pageText, setPageText] = useState('')
  const [currentState, setCurrentState] = useState('')
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [displayedMovies, setDisplayedMovies] = useState([])
  const [tumblerState, setTumblerState] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // стейты для /saved-movies
  const [savedPageText, setSavedPageText] = useState('')
  const [savedCurrentState, setSavedCurrentState] = useState('')
  const [savedMovies, setSavedMovies] = useState([])
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([])
  const [savedTumblerState, setSavedTumblerState] = useState(false)
  const [savedSearchQuery, setSavedSearchQuery] = useState('')

  useEffect(() => {
    if (searchQuery.length) {
      filterMovies()
    }
  }, [movies])

  useEffect(() => {
    setDisplayedMovies(
      filteredMovies.slice(0, calcInitialMovies(filteredMovies.length))
    )
    if (!filteredMovies.length && movies.length) {
      setDisplayedMovies([])
    }
  }, [filteredMovies])

  useEffect(() => {
    filterMovies(true)
    markSavedMovies()
  }, [savedMovies])

  // меняем текст страницы и состояние загрузки в зависимости от стейтов
  useEffect(() => {
    if (displayedMovies.length && searchQuery.length) {
      setPageText('')
      setCurrentState('loaded')
    } else if (!displayedMovies.length && searchQuery.length) {
      setPageText('Ничего не найдено')
      setCurrentState('')
    } else {
      setPageText('Введите поисковый запрос')
      setCurrentState('')
    }
  }, [displayedMovies])

  useEffect(() => {
    if (savedFilteredMovies.length && savedSearchQuery.length) {
      setSavedPageText('')
      setSavedCurrentState('loaded')
    } else if (
      !savedFilteredMovies.length &&
      (savedSearchQuery.length || savedTumblerState)
    ) {
      setSavedPageText('Ничего не найдено')
      setSavedCurrentState('')
    } else {
      setSavedPageText('')
      setSavedCurrentState('loaded')
    }
  }, [savedFilteredMovies])

  // при монтировании компонента проверяем, есть ли сохраненные результаты поиска в localStorage
  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem('savedSearch'))
    if (savedSearch) {
      setMovies(savedSearch.movies)
      setSearchQuery(savedSearch.searchQuery)
      setTumblerState(savedSearch.tumblerState)
    }

    mainApi
      .getMovies()
      .then(res => {
        setSavedMovies(res.data)
      })
      .catch(err => {
        console.log(err)
        setSavedPageText('Не удалось загрузить сохраненные фильмы =(')
        setSavedCurrentState('')
      })
  }, [])

  // при изменении одного из стейтов хранимых в localStorage, обновляем localStorage
  useEffect(() => {
    if (currentState === 'loaded') {
      setLocalStorage()
    }
  }, [currentState, movies, searchQuery, tumblerState])

  // при изменении тумблера - фильтруем фильмы
  useEffect(() => {
    filterMovies()
  }, [tumblerState])

  useEffect(() => {
    filterMovies(true)
  }, [savedTumblerState])

  // функция для маркировки сохраненных фильмов в списке всех фильмов
  function markSavedMovies() {
    if (movies.length) {
      const updatedMovies = updateMoviesIfSaved(movies, savedMovies)
      setMovies(updatedMovies)
    }
  }

  function searchMovies() {
    if (!movies.length) {
      setCurrentState('loading')
      moviesApi
        .getMovies()
        .then(res => {
          const markedMovies = updateMoviesIfSaved(res, savedMovies)
          setMovies(markedMovies)
        })
        .catch(err => {
          console.log(err)
          setPageText(
            'Во время запроса произошла ошибка. Попробуйте ещё раз =('
          )
          setCurrentState('')
        })
    } else {
      filterMovies()
    }
  }

  function searchSavedMovies() {
    filterMovies(true)
  }

  function filterMovies(isForSaved = false) {
    const title = isForSaved ? savedSearchQuery : searchQuery
    const tumbler = isForSaved ? savedTumblerState : tumblerState
    const duration = tumbler ? 40 : 0
    const filteredSetter = isForSaved
      ? setSavedFilteredMovies
      : setFilteredMovies
    const moviesToFilter = isForSaved ? savedMovies : movies
    const result = filterByDuration(
      filterByTitle(moviesToFilter, title),
      duration
    )
    filteredSetter(result)
  }

  function handleSearch(e) {
    e.preventDefault()
    searchMovies()
  }

  function handleSavedSearch(e) {
    e.preventDefault()
    searchSavedMovies()
  }

  function handleTumblerSwitch() {
    setTumblerState(!tumblerState)
  }

  function handleSavedTumblerSwitch() {
    setSavedTumblerState(!savedTumblerState)
  }

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value)
  }

  function handleSavedSearchQueryChange(e) {
    setSavedSearchQuery(e.target.value)
  }

  function handleMovieBtnClick(e) {
    if (e.isCardSaved) {
      handleMovieDelete(e)
    } else if (isSaved) {
      handleSavedMovieDelete(e)
    } else {
      handleMovieSave(e)
    }
  }

  function handleSearchOnKeyDown(e) {
    const formField = document.querySelector('.search-form__input')
    if (
      e.key === 'Enter' &&
      (searchQuery !== '' || isSaved) &&
      formField === document.activeElement
    ) {
      if (isSaved) {
        searchSavedMovies()
      } else {
        searchMovies()
      }
    }
  }

  // TODO: добавить проверку на то, что фильм уже сохранен
  // TODO: при очистке поисковой строки в сохраненных фильмах оставлять кнопку сабмита активной
  function handleMovieSave(m) {
    // console.log(m)
    if (m.isCardSaved) return
    mainApi
      .saveMovie({
        movieId: m.id,
        nameRU: m.nameRU,
        nameEN: m.nameEN,
        duration: m.duration,
        image: `https://api.nomoreparties.co${m.image.url}`,
        trailer: m.trailerLink,
        thumbnail: m.image.formats.thumbnail.url
          ? `https://api.nomoreparties.co${m.image.formats.thumbnail.url}`
          : null,
        country: m.country,
        director: m.director,
        year: m.year,
        description: m.description,
      })
      .then(res => {
        setSavedMovies([...savedMovies, res.data])
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleMovieDelete(m) {
    // console.log(m)
    if (!m.isCardSaved) return
    const movieToDelete = savedMovies.find(movie => movie.movieId === m.id)
    mainApi
      .deleteMovie(movieToDelete._id)
      .then(res => {
        setSavedMovies(
          savedMovies.filter(movie => movie.movieId !== movieToDelete.movieId)
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleSavedMovieDelete(m) {
    console.log(m)
    mainApi
      .deleteMovie(m._id)
      .then(res => {
        setSavedMovies(savedMovies.filter(movie => movie._id !== m._id))
      })
      .catch(err => {
        console.log(err)
      })
  }

  // функция для сохранения стейтов в localStorage
  function setLocalStorage() {
    localStorage.setItem(
      'savedSearch',
      JSON.stringify({
        currentState: 'loaded',
        movies,
        searchQuery,
        tumblerState,
      })
    )
  }

  function handleLoadMore() {
    loadMore()
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      {isSaved ? (
        <Movies
          isSaved={isSaved}
          currentState={savedCurrentState}
          filteredMovies={savedFilteredMovies}
          displayedMovies={savedFilteredMovies}
          searchQuery={savedSearchQuery}
          tumblerState={savedTumblerState}
          pageText={savedPageText}
          handleSearch={handleSavedSearch}
          handleTumblerSwitch={handleSavedTumblerSwitch}
          handleSearchQueryChange={handleSavedSearchQueryChange}
          handleMovieBtnClick={handleMovieBtnClick}
          handleSearchOnKeyDown={handleSearchOnKeyDown}
        />
      ) : (
        <Movies
          isSaved={isSaved}
          currentState={currentState}
          filteredMovies={filteredMovies}
          displayedMovies={displayedMovies}
          searchQuery={searchQuery}
          tumblerState={tumblerState}
          pageText={pageText}
          handleSearch={handleSearch}
          handleTumblerSwitch={handleTumblerSwitch}
          handleSearchQueryChange={handleSearchQueryChange}
          handleLoadMore={handleLoadMore}
          handleMovieBtnClick={handleMovieBtnClick}
          handleSearchOnKeyDown={handleSearchOnKeyDown}
        />
      )}

      <Footer />
    </>
  )
}

export default MoviesPage
