// ссылка на бэк
export const BASE_URL = 'https://api.wofamovies.nomoredomains.work';
export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

//ссылки в портфолио
export const LINK_PORTFOLIO_1 = 'https://wofahub.github.io/mesto-react/';
export const LINK_PORTFOLIO_2 = 'https://github.com/WofAhub/how-to-learn';
export const LINK_PORTFOLIO_3 = 'https://github.com/WofAhub/russian-travel';

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
  WRONG_EMAIL: 'Email не соответсует стандарту',
  ERROR_SERVER: 'Ошибка на сервере',
  UPDATE_ERROR: 'При обнолвении пользователя произошла ошибка',
  ERROR_SIGNUP: 'Во время регистрации произошла ошибка',
  ERROR_SIGNIN: 'Во время авторизации произошла ошибка',
  ERROR_UPDATE: 'Во время обновления произошла ошибка'
};

// паттерн для валидации
export const EMAIL_PATTERT = "^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$";

// сообщения о результате поиска
export const RESULT_MESSAGE = {
  SOMETHING_WRONG: 'Во время загрузки что-то пошло не так',
  NOTHING_FOUND: 'Ничего не найдено',
}

// обновление профиля
export const RESULT_UPDATE_PROFILE = {
  SUCCESS: 'Профиль обновлён',
}

// кол-во фильмов
export const NUBER_OF_MOVIES_12 = 12;
export const NUBER_OF_MOVIES_8 = 8;
export const NUBER_OF_MOVIES_5 = 5;

export const NUBER_OF_MOVIES_ADD_3 = 3;
export const NUBER_OF_MOVIES_ADD_2 = 2;

// удаляю из localStorage
export const deleteFromLocalStorage = (nameOfLocalStorage) => {
  return localStorage.removeItem(`${nameOfLocalStorage}`);
}

// устанавливаю данные
export const dataMovies = (movie) => {
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `https://api.nomoreparties.co${movie.image.url}`,
    movieId: movie.id,
    trailerLink: movie.trailerLink,
    thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  }
}