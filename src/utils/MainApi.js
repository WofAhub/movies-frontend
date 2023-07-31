class MainApi {
  constructor({ fetchUrl, headers }) {
    this._fetchUrl = fetchUrl;
    this._headers = headers;
  };

  // получаем json, если ответ пришел
  _getJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  // устанавливаю головы
  _setHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      ...this._headers,
    }
  };

  // регистрация
  register(name, email, password) {
    return fetch(`${this._fetchUrl}/signup`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => {
        return this._getJson(res)
      })
  };

  // логин
  login(email, password) {
    return fetch(`${this._fetchUrl}/signin`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        return this._getJson(res)
      })
  };

  // проверка токена
  checkToken() {
    return fetch(`${this._fetchUrl}/users/me`, {
      method: 'GET',
      headers: this._setHeaders(),
    })
      .then((res) => {
        return this._getJson(res)
      })
  };
}

export const mainApi = new MainApi({
  fetchUrl: 'https://api.wofamovies.nomoredomains.work/',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
  }
})