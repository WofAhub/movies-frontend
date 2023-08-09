// ссылка на бэк
export const BASE_URL = 'https://api.wofamovies.nomoredomains.work';
export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

//роуты фронт
export const PATH_404 = '*';
export const PROFILE = '/profile';
export const SAVED_MOVIES = '/saved-movies';
export const MOVIES = '/movies';                  // + api
export const SIGN_UP = '/sign-up';
export const SIGN_IN = '/sign-in';
export const BASE_ROUTE = '/';

// роуты api
export const SIGNUP = '/signup';
export const SIGIN = '/signin';
export const USERS_ME = '/users/me';

// короткометражка
export const DURATION_40 = 40;

// валидация
export const ERROR_MESSAGES = {
    WRONG_EMAIL_OR_PASSWORD: 'Неправильный логин или пароль',
    EMAIL_IS_EXISTS_ALREADY: 'Пользователь с таким email уже существует',
    ERROR_SERVER: 'Ошибка на сервере',
    UPDATE_ERROR: 'При обнолвении пользователя произошла ошибка',
    ERROR_SIGNUP: 'Во время регистрации произошла ошибка',
    ERROR_SIGNIN: 'Во время авторизации произошла ошибка',
};

// кол-во фильмов
export const NUBER_OF_MOVIES_12 = 12;
export const NUBER_OF_MOVIES_8 = 8;
export const NUBER_OF_MOVIES_5 = 5;

export const NUBER_OF_MOVIES_ADD_3 = 3;
export const NUBER_OF_MOVIES_ADD_2 = 2;