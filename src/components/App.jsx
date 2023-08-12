// --- база
import { React, useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from './ProtectedRoute';
import * as mainApi from '../utils/MainApi';

// --- модули
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
import { deleteFromLocalStorage } from '../utils/constants/constants';
import {
  PATH_404,
  PROFILE,
  SAVED_MOVIES,
  MOVIES,
  SIGN_IN,
  SIGN_UP,
  BASE_ROUTE
} from '../utils/constants/constants';

function App() {

  // -- пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // сохраненные фильмы
  const [savedMovies, setSavedMovies] = useState([]);

  // -- служебное
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // -- localStorage GET
  const token = localStorage.getItem('token');

  // -- юзы
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // проверка токена
  async function checkToken() {
    if (token) {
      try {
        const res = await mainApi.checkToken(token)
        const savedMovies = await mainApi.getMovies()
        setSavedMovies(savedMovies);
        if (res) {
          setLoggedIn(true);
          navigate({ BASE_ROUTE, replace: false });
        }
      } catch (err) {
        console.log(`Ошибка в checkToken, в App: ${err.status}`);
      }
    }
  }

  // получаю и устанавливаю данные пользователя, когда проходит логин
  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      mainApi
        .getCurrentUser()
        .then((user) => {
          setLoading(false);
          setCurrentUser(user)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [loggedIn]);


  // убираю сообщения об ошибках в логине и регистре, 
  //когда было соверешно перемещение по страницам
  useEffect(() => {
    if (currentUser) {
      setErrorMessage('');
    }
  }, [currentUser, navigate]);

  // Удалить фильм
  async function handleDeleteSavedMovie(movie) {
    try {
      await mainApi.deleteMovie(movie._id);

      setSavedMovies((movies) =>
        movies.filter((savedMovie) => savedMovie._id !== movie._id),
      );
    } catch (err) {
      console.log(err);
    }
  }

  // Сохранить фильм
  async function handleAddSavedMovie(movie) {
    try {
      const savedMovie = await mainApi.saveMovie(movie);
      if (savedMovie) {
        setSavedMovies((movies) => [...movies, savedMovie]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // выход из аккаунта
  function logOut() {
    deleteFromLocalStorage('token')
    deleteFromLocalStorage('foundMoviesList')
    deleteFromLocalStorage('toggleCheckbox')
    deleteFromLocalStorage('searchQuery')

    setLoggedIn(false);
    navigate(BASE_ROUTE, { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser || ''}>
      <div className='app'>
        {loggedIn ?
          <Navigation /> :
          pathname === SIGN_UP ?
            null :
            pathname === SIGN_IN ?
              null :
              <NavTab />
        }
        <Routes>
          <Route
            path={SIGN_IN}
            element={
              <Login
                setErrorMessage={setErrorMessage}
                setLoggedIn={setLoggedIn}
                setLoading={setLoading}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path={SIGN_UP}
            element={
              <Register
                setLoading={setLoading}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          />
          <Route
            path={BASE_ROUTE}
            element={
              <Main />
            }
          />
          <Route
            path={MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Movies}
                setLoading={setLoading}
                loading={loading}

                savedMovies={savedMovies}
                onDelete={handleDeleteSavedMovie}
                onSave={handleAddSavedMovie}
              />
            }
          />
          <Route
            path={SAVED_MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={SavedMovies}

                onDelete={handleDeleteSavedMovie}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path={PROFILE}
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                setLoading={setLoading}
                setCurrentUser={setCurrentUser}
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
