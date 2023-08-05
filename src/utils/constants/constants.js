//размер экрана
export const LAPTOP_SCREEN_WIDTH = 1024;
export const TABLET_SCREEN_WIDTH = 768;
export const MOBILE_SCREEN_WIDTH = 480;

// количество показанных фильмов в сетке фильмов
export const NUM_CARDS_DESKTOP_INIT = 12;
export const NUM_CARDS_TABLET_INIT = 8;
export const NUM_CARDS_MOBILE_INIT = 5;

export const NUM_CARDS_DESKTOP_ADD = 3;
export const NUM_CARDS_TABLET_ADD = 2;
export const NUM_CARDS_MOBILE_ADD = 2;

//роут
export const PATH_404 = '/*'

// ссылка на бэк
export const BASE_URL = 'https://api.wofamovies.nomoredomains.work';
export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

// роуты
export const SIGNUP = '/signup';
export const SIGIN = '/signin';
export const USERS_ME = '/users/me';

// валидация
export const ERROR_MESSAGES = {
    WRONG_EMAIL_OR_PASSWORD: 'Неправильный логин или пароль',
    EMAIL_IS_EXISTS_ALREADY: 'Пользователь с таким email уже существует',
    ERROR_SERVER: 'Ошибка на сервере',
    UPDATE_ERROR: 'При обнолвении пользователя произошла ошибка',
    ERROR_SIGNUP: 'Во время регистрации произошла ошибка',
    ERROR_SIGNIN: 'Во время авторизации произошла ошибка',
};