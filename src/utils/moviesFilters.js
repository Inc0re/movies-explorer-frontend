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
  if (windowWidth > 1074) {
    return 12
  } else if (windowWidth > 682) {
    return 8
  } else {
    return 5
  }
}

// рассчет количества фильмов для подгрузки
function calcMoviesToLoad() {
  const windowWidth = window.innerWidth
  if (windowWidth > 1074) {
    return 3
  } else {
    return 2
  }
}

// функция подгрузки фильмов
function loadMovies(displayedMovies = [], filteredMovies = [], pagination = 0) {
  const moviesToLoad = calcInitialMovies() + calcMoviesToLoad() * pagination
  // console.log([calcInitialMovies(), calcMoviesToLoad(), pagination, moviesToLoad])
  const moviesLeft = filteredMovies.length - displayedMovies.length
  if (moviesLeft > calcMoviesToLoad()) {
    return filteredMovies.slice(
      0,
      moviesToLoad
    )
  } else {
    return filteredMovies.slice(0, filteredMovies.length)
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
}
