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
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
}

// логин
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
};

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

// получаю информацию о пользователе
export const getCurrentUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
};