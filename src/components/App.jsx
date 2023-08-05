// база
import { React, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from './ProtectedRoute';
import * as mainApi from '../utils/MainApi';
import * as moviesApi from '../utils/MoviesApi';

// модули
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Main from './Main';
import Movies from './Movies';
import NotFoundPage from './NotFoundPage';
import SavedMovies from './SavedMovies';
import Navigation from './Navigation';
import NavTab from './NavTab';
import Preloader from './Preloader';
import { ERROR_MESSAGES } from '../utils/constants/constants';
import { PATH_404 } from '../utils/constants/constants';

// ошибки
import { DUBLICATE_ERROR } from '../errors/DublicateError';
import { UNAUTHORIZED_ERROR } from '../errors/UnauthorizedError';
import { UNHANDLE_ERROR } from '../errors/UnhandleError';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesList, setMoviesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // проверка токена
  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка в checkToken, в App: ${err.status}`);
        })
    }
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // регистрация
  function register({ name, email, password }) {
    setLoading(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        setLoading(false);
        setErrorMessage('');
        console.log(res, 'Это res из register в App.jsx')
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        let errorMessage;
        if (DUBLICATE_ERROR) {
          errorMessage = ERROR_MESSAGES.EMAIL_IS_EXISTS_ALREADY;
        } else if (UNHANDLE_ERROR) {
          errorMessage = ERROR_MESSAGES.ERROR_SERVER;
        } else {
          errorMessage = ERROR_MESSAGES.ERROR_SIGNUP;
        }
        setLoading(false);
        setErrorMessage(errorMessage);
        console.log(`Ошибка в регистрации, в App: ${err}`)
      })
      .finally(() => {
        setLoading(false);
      })
  };

  // логин
  function login({ email, password }) {
    setLoading(true);
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setLoading(false);
          console.log(data, "Это res из login в App.jsx")
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        let errorMessage;
        if (UNAUTHORIZED_ERROR) {
          errorMessage = ERROR_MESSAGES.WRONG_EMAIL_OR_PASSWORD;
        } else if (UNHANDLE_ERROR) {
          errorMessage = ERROR_MESSAGES.ERROR_SERVER;
        } else {
          errorMessage = ERROR_MESSAGES.ERROR_SIGNIN;
        }
        setLoading(false);
        setErrorMessage(errorMessage);
        console.log(`Ошибка в App, loginUser: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  // получаю и устанавливаю данные пользователя, когда проходит логин
  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      mainApi
        .getCurrentUser()
        .then((user) => {
          setLoading(false);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [loggedIn]);

  // запрос обновления информации юзера
  function updateUserInfo(data) {
    setLoading(true);
    mainApi
      .editUserInfo(data)
      .then((res) => {
        setLoading(false);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка в App, handleUpdateUser: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  // убираю сообщения об ошибках в логине и регистре, 
  //когда было соверешно перемещение по страницам
  useEffect(() => {
    if (currentUser) {
      setErrorMessage('');
    }
  }, [currentUser, navigate]);

  //получаю фильмы
  function getMovies() {
    setLoading(true);
    moviesApi
      .getMovies()
      .then((res) => {
        setLoading(false);
        setMoviesList(res)
      })
      .catch((err) => {
        console.log(`Ошибка в Movies, getMovies: ${err}`)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    getMovies();
  }, [])

  // выход из аккаунта
  function logOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser || ''}>
      <div className='app'>
        {loggedIn ?
          <Navigation /> :
          window.location.pathname === '/sign-up' ?
            null :
            window.location.pathname === '/sign-in' ?
              null :
              window.location.pathname !== '/sign-in' ?
                <NavTab /> :
                null
        }
        <Routes>
          <Route
            path='/sign-in'
            element={
              <Login
                onLogin={login}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path='/sign-up'
            element={
              <Register
                onRegister={register}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path='/'
            element={
              <Main />
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Movies}
                moviesList={moviesList}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={SavedMovies}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                updateUserInfo={updateUserInfo}
                loggedIn={loggedIn}
                logout={logOut}
              />
            }
          />
          <Route
            path={PATH_404}
            element={
              <NotFoundPage />
            }
          />
        </Routes>
        <Preloader
          loading={loading}
        />
      </div >
    </CurrentUserContext.Provider >
  )
}

export default App;
