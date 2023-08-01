// class MainApi {
//   constructor({ fetchUrl, headers }) {
//     this._fetchUrl = fetchUrl;
//     this._headers = headers;
//   };

//   // получаем json, если ответ пришел
//   _getJson(res) {
//     if (res.ok) {
//       return res.json();
//     } else {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//   };

//   // устанавливаю головы
//   _setHeaders() {
//     const token = localStorage.getItem('token');
//     return {
//       'Authorization': `Bearer ${token}`,
//       ...this._headers,
//     }
//   };

//   // регистрация
//   register({ name, email, password }) {
//     return fetch(`${this._fetchUrl}/signup`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, password })
//     })
//       .then((res) => {
//         return this._getJson(res)
//       })
//   };

//   // логин
//   login({ email, password }) {
//     return fetch(`${this._fetchUrl}/signin`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify({ email, password })
//     })
//       .then((res) => {
//         return this._getJson(res)
//       })
//   };

//   // проверка токена
//   checkToken(token) {
//     return fetch(`${this._fetchUrl}/users/me`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then((res) => {
//         return this._getJson(res)
//       })
//   };

//   // получение меня
//   getCurrentUser() {
//     return fetch(`${this._fetchUrl}/users/me`, {
//       headers: this._setHeaders(),
//     })
//       .then(this._getJson);
//   };

//   // редктировать информацию о пользователе
//   editUserInfo({ name, email }) {
//     return fetch(`${this._fetchUrl}/users/me`, {
//       method: "PATCH",
//       headers: this._setHeaders(),
//       body: JSON.stringify({ name, email })
//     })
//       .then(this._getJson);
//   }
// }

// export const mainApi = new MainApi({
//   fetchUrl: 'https://api.wofamovies.nomoredomains.work',
//   headers: {
//     'Accept': 'application/json',
//     'Content-type': 'application/json',
//   }
// })

export const BASE_URL = 'https://api.wofamovies.nomoredomains.work';

// проверка ответа с сервера
function checkAnswerFromServer(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// регистрация
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
}

// проверка токена
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
};