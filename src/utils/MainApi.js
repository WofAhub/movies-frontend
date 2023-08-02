import {
  BASE_URL,
  SIGNUP,
  SIGIN,
  USERS_ME,
} from './constants';

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
  return fetch(`${BASE_URL}${SIGNUP}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
}

// логин
export const login = (email, password) => {
  return fetch(`${BASE_URL}${SIGIN}`, {
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
  return fetch(`${BASE_URL}${USERS_ME}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
};

// получаю информацию о пользователе
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}${USERS_ME}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
};