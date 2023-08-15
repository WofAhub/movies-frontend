import {
  BASE_URL,
  SIGNUP,
  SIGIN,
  USERS_ME,
  MOVIES,
} from './constants/constants';
import checkAnswerFromServer from './functions/api';

const getToken = () => {
  const token = localStorage.getItem('token');
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

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

// редактирование информации о пользователе через попап Профиля
export const editUserInfo = (data) => {
  return fetch(`${BASE_URL}${USERS_ME}`, {
    method: 'PATCH',
    headers: getToken(),
    body: JSON.stringify({
      name: data.name,
      email: data.email
    })
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
}

// получение фильмов
export const getMovies = () => {
  return fetch(`${BASE_URL}${MOVIES}`, {
    method: 'GET',
    headers: getToken(),
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
}

//удаляю фильмы из сохраненных
export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: getToken(),
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
};

//сохраняю фильмы
export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}${MOVIES}`, {
    method: 'POST',
    headers: getToken(),
    body: JSON.stringify(movie)
  })
    .then((res) => {
      return checkAnswerFromServer(res)
    })
};