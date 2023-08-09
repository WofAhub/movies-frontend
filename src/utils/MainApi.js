import {
  BASE_URL,
  SIGNUP,
  SIGIN,
  USERS_ME,
} from './constants/constants';
import checkAnswerFromServer from './functions/api';

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

// редактирование информации о пользователе через попап Профиля
export const editUserInfo = (data) => {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}${USERS_ME}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email
    })
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
}