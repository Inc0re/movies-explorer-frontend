import React, { useState, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import moviesApi from '../../utils/MoviesApi'
import mainApi from '../../utils/MainApi'
import {
  searchMovies,
  loadMore,
  updateMoviesIfSaved,
} from '../../utils/moviesFilters'

function MoviesPage({ loggedIn, isSaved }) {
  // стейты для /movies
  const [pageText, setPageText] = useState('Введите поисковый запрос')
  const [currentState, setCurrentState] = useState('')
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [displayedMovies, setDisplayedMovies] = useState([])
  const [tumblerState, setTumblerState] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // стейты для /saved-movies
  const [savedPageText, setSavedPageText] = useState(
    'У вас еще нет сохраненных фильмов'
  )
  const [savedCurrentState, setSavedCurrentState] = useState('')
  const [savedMovies, setSavedMovies] = useState([])
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([])
  const [savedTumblerState, setSavedTumblerState] = useState(false)
  const [savedSearchQuery, setSavedSearchQuery] = useState('')

  function getSavedMoviesAndUpdateMovies(savedSearch) {
    mainApi.getMovies().then(res => {
      const newMovies = updateMoviesIfSaved(savedSearch.movies, res.data)
      setSavedMovies(res.data)
      setSavedFilteredMovies(res.data)
      setSavedCurrentState('loaded')
      setMovies(newMovies)
    })
  }

  async function getAllMovies() {
    try {
      const moviesRes = await moviesApi.getMovies()
      const savedMoviesRes = await mainApi.getMovies()
      const newMovies = updateMoviesIfSaved(moviesRes, savedMoviesRes.data)
      setSavedMovies(savedMoviesRes.data)
      setSavedFilteredMovies(savedMoviesRes.data)
      setSavedCurrentState('loaded')
      setMovies(newMovies)
    } catch (err) {
      console.log(err)
      setCurrentState('')
      setPageText(
        `Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз`
      )
    }
  }

  // при монтировании компонента проверяем, есть ли сохраненные результаты поиска в localStorage
  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem('savedSearch'))
    if (savedSearch) {
      setCurrentState(savedSearch.currentState)
      // setMovies(savedSearch.movies)
      setFilteredMovies(savedSearch.filteredMovies)
      setDisplayedMovies(savedSearch.displayedMovies)
      setSearchQuery(savedSearch.searchQuery)
      setTumblerState(savedSearch.tumblerState)
      getSavedMoviesAndUpdateMovies(savedSearch)
    } else {
      getAllMovies()
    }
  }, [])

  // при переключении тумблера фильтруем уже найденное по времени
  useEffect(() => {
    if (!currentState === 'loaded' || searchQuery === '') return
    searchMovies(
      setCurrentState,
      setPageText,
      setFilteredMovies,
      setDisplayedMovies,
      movies,
      searchQuery,
      tumblerState
    )
  }, [tumblerState])

  useEffect(() => {
    if (!currentState === 'loaded' || searchQuery === '') return
    searchMovies(
      setSavedCurrentState,
      setSavedPageText,
      setSavedFilteredMovies,
      null,
      savedMovies,
      savedSearchQuery,
      savedTumblerState
    )
  }, [savedTumblerState])

  // // при изменении одного из стейтов хранимых в localStorage, обновляем localStorage
  // useEffect(() => {
  //   if (currentState === 'loaded') {
  //     setLocalStorage()
  //   }
  // }, [
  //   currentState,
  //   movies,
  //   filteredMovies,
  //   displayedMovies,
  //   searchQuery,
  //   tumblerState,
  // ])

  function handleSearch(e) {
    e.preventDefault()
    searchMovies(
      setCurrentState,
      setPageText,
      setFilteredMovies,
      setDisplayedMovies,
      movies,
      searchQuery,
      tumblerState
    )
  }

  function handleSavedSearch(e) {
    e.preventDefault()
    searchMovies(
      setSavedCurrentState,
      setSavedPageText,
      setSavedFilteredMovies,
      null,
      savedMovies,
      savedSearchQuery,
      savedTumblerState
    )
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
    if (e.isCardSaved || isSaved) {
      handleMovieDelete(e)
    } else {
      handleMovieSave(e)
    }
  }

  // TODO: добавить проверку на то, что фильм уже сохранен
  function handleMovieSave(m) {
    // if (m.isCardSaved) return
    console.log(m)
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
        m.isCardSaved = true
        m._id = res.data._id
        setSavedMovies([...savedMovies, res.data])
        if (!savedSearchQuery) {
          setSavedFilteredMovies([...savedFilteredMovies, res.data])
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleMovieDelete(m) {
    console.log(m)
    mainApi.deleteMovie(m._id).then(res => {
      m.isCardSaved = false
      setSavedMovies(savedMovies.filter(movie => movie._id !== m._id))
      if (!savedSearchQuery) {
        setSavedFilteredMovies(
          savedFilteredMovies.filter(movie => movie._id !== m._id)
        )
      }
    })
  }

  function setLocalStorage() {
    localStorage.setItem(
      'savedSearch',
      JSON.stringify({
        currentState: 'loaded',
        movies,
        filteredMovies,
        displayedMovies,
        searchQuery,
        tumblerState,
      })
    )
  }

  function handleLoadMore() {
    loadMore(setDisplayedMovies, displayedMovies, filteredMovies)
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
        />
      )}

      <Footer />
    </>
  )
}

export default MoviesPage
