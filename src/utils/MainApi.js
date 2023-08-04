class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
    this._credentials = options.credentials
  }

  _getJson(res) {
    if (res.ok) {
      return res.json()
    }
    return res.json().then(err => Promise.reject(err))
  }

  _request(url, options) {
    return fetch(url, {
      credentials: this._credentials,
      ...options,
    }).then(this._getJson)
  }

  register({ email, password, name }) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    })
  }

  login({ email, password }) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
  }

  logout() {
    return this._request(`${this._baseUrl}/logout`, {
      headers: this._headers,
    })
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  updateUserInfo({ name, email }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    })
  }

  getMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
    })
  }

  addMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    })
  }

  deleteMovie(movieId) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.pandex.team',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
})

export default api
