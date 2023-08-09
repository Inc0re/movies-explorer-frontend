import {
  SCREEN_BREAKPOINT_PC,
  SCREEN_BREAKPOINT_TABLET,
  INITIAL_CARDS_PC,
  INITIAL_CARDS_TABLET,
  INITIAL_CARDS_MOBILE,
  MOVIES_TO_LOAD_PC,
  MOVIES_TO_LOAD_TABLET,
} from './constants'

// фильтр по названию
function filterByTitle(movies = [], title = '') {
  if (title === '') return movies
  return movies.filter(
    movie =>
      movie.nameRU.toLowerCase().includes(title.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(title.toLowerCase())
  )
}

// фильтр по длительности
function filterByDuration(movies = [], duration = 0) {
  if (duration === 0) return movies
  return movies.filter(movie => movie.duration <= duration)
}

// рассчет начального количества фильмов
function calcInitialMovies() {
  const windowWidth = window.innerWidth
  if (windowWidth > SCREEN_BREAKPOINT_PC) {
    return INITIAL_CARDS_PC
  } else if (windowWidth > SCREEN_BREAKPOINT_TABLET) {
    return INITIAL_CARDS_TABLET
  } else {
    return INITIAL_CARDS_MOBILE
  }
}

// рассчет количества фильмов для подгрузки
function calcMoviesToLoad() {
  const windowWidth = window.innerWidth
  if (windowWidth > SCREEN_BREAKPOINT_PC) {
    return MOVIES_TO_LOAD_PC
  } else {
    return MOVIES_TO_LOAD_TABLET
  }
}

// функция подгрузки фильмов
function loadMovies(
  displayedMovies = [],
  filteredMovies = [],
  dMoviesCount = 0
) {
  const moviesLeft = filteredMovies.length - displayedMovies.length
  if (dMoviesCount) {
    return dMoviesCount < filteredMovies.length
      ? filteredMovies.slice(0, dMoviesCount)
      : filteredMovies
  } else {
    return moviesLeft > calcMoviesToLoad()
      ? filteredMovies.slice(0, calcInitialMovies())
      : filteredMovies
  }
}

function updateMoviesIfSaved(movies, savedMovies) {
  // console.log(`${movies.length} ${savedMovies.length}`)
  const newMovies = movies.map(movie => {
    let foundCard = savedMovies.find(
      savedMovie => savedMovie.movieId === movie.id
    )
    if (foundCard) {
      return { ...movie, isCardSaved: true, _id: foundCard._id }
    } else {
      return { ...movie, isCardSaved: false }
    }
  })
  return newMovies
}

export {
  filterByTitle,
  filterByDuration,
  loadMovies,
  updateMoviesIfSaved,
  calcInitialMovies,
  calcMoviesToLoad,
}
