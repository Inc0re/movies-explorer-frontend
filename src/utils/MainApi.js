class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, {
      credentials: this._credentials,
      ...options,
    }).then(this._getJson);
  }

  register({ email, password, name }) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    });
  }

  login({ email, password }) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    });
  }

  logout() {
    return this._request(`${this._baseUrl}/logout`, {
      method: 'POST',
      headers: this._headers,
    });
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