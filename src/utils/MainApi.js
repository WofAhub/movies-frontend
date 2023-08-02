import {
  BASE_URL,
  SIGNUP,
  SIGIN,
  USERS_ME,
} from './constants/constants';
import checkAnswerFromServer from './function/function';

// регистрация
export const register = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}${SIGNUP}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });
  return checkAnswerFromServer(res);
}

// логин
export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}${SIGIN}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  return checkAnswerFromServer(res);
};

// проверка токена
export const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}${USERS_ME}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return checkAnswerFromServer(res);
};

// получаю информацию о пользователе
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}${USERS_ME}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return checkAnswerFromServer(res);
};