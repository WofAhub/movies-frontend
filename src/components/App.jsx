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
import { DURATION_40 } from '../utils/constants/constants';
import { PATH_404, PROFILE, SAVED_MOVIES, MOVIES, SIGN_IN, SIGN_UP, BASE_ROUTE } from '../utils/constants/constants';

function App() {

  // --- пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // --- фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  const [isFilterChecked, setFilterChecked] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);

  // --- служебное
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // --- localStorage GET
  const localStorageMoviesSaved = JSON.parse(localStorage.getItem('moviesSaved'));
  const token = localStorage.getItem('token');

  // --- юзы
  const navigate = useNavigate();
  const location = useLocation();

  // стейт чекбокса
  function handleFilterState() {
    setFilterChecked(!isFilterChecked);
    if (isFilterChecked) return;
    if (!isFilterChecked) {
      filterMoviesByDuration();
    }
  }

  // фильтр фильмов
  function filterMoviesByDuration() {
    const filteredMovies = foundMovies.filter((i) => i.duration <= DURATION_40);
    setFoundMovies(filteredMovies);
  }

  // искать сохраненные фильмы
  function searchSavedMovies(searchingMovies) {
    const foundMoviesList = localStorageMoviesSaved.filter(movie => {
      return movie.nameRU.toLowerCase().includes(searchingMovies.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchingMovies.toLowerCase());
    });
    setSavedMovies(foundMoviesList);
  }

  // фильтровать сохраненные фильмы
  function filterSavedMovies() {
    const moviesFiltereList = localStorageMoviesSaved.filter(movie => {
      return movie.duration <= DURATION_40;
    });
    setSavedMovies(moviesFiltereList);
  }

  // проверка токена
  function checkToken() {
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate({ replace: false });
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

  // получаю сохраненные фильмы
  useEffect(() => {
    if (!loggedIn) return;
    if (token) {
      mainApi
        .getMovies()
        .then((res) => {
          if (res) {
            localStorage.setItem('moviesSaved', JSON.stringify(res));
            setSavedMovies(res);
          }
        })
        .catch((err) => {
          console.log(`Ошибка в App, useEffect, получаю сохраненные фильмы в LS: ${err}`);
        })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  // выход из аккаунта
  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('foundMovies')
    localStorage.removeItem('moviesFound');
    localStorage.removeItem('moviesSaved');
    localStorage.removeItem('moviesCurrent');

    setLoggedIn(false);
    navigate(SIGN_IN, { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser || ''}>
      <div className='app'>
        {loggedIn ?
          <Navigation /> :
          location.pathname === SIGN_UP ?
            null :
            location.pathname === SIGN_IN ?
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

                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                foundMovies={foundMovies}
                setFoundMovies={setFoundMovies}
                handleFilterState={handleFilterState}
                onCheckbox={filterMoviesByDuration}
                isSaved={false}
              />
            }
          />
          <Route
            path={SAVED_MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={SavedMovies}

                onSavedSearch={searchSavedMovies}
                onSavedCheckbox={filterSavedMovies}
                handleFilterState={handleFilterState}
                isFilterChecked={isFilterChecked}
                setFilterChecked={setFilterChecked}
                savedMovies={savedMovies}
                isSaved={true}
              />
            }
          />
          <Route
            path={PROFILE}
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
