class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
    this._credentials = options.credentials
  }

  _getJson(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error: ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, {
      credentials: this._credentials,
      ...options,
    }).then(this._getJson)
  }

  //todo: add functions for api requests
  getMovies() {
    return this._request(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    })
  }
}

//TODO: replace with your own API address
const api = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
