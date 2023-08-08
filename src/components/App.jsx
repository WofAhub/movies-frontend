// база
import { React, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from './ProtectedRoute';
import * as mainApi from '../utils/MainApi';

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
import { PATH_404, PROFILE, SAVED_MOVIES, MOVIES, SIGN_IN, SIGN_UP, BASE_ROUTE } from '../utils/constants/constants';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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
            navigate(MOVIES, { replace: true });
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

  // выход из аккаунта
  function logOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate(SIGN_IN, { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser || ''}>
      <div className='app'>
        {loggedIn ?
          <Navigation /> :
          window.location.pathname === SIGN_UP ?
            null :
            window.location.pathname === SIGN_IN ?
              null :
              window.location.pathname !== SIGN_IN ?
                <NavTab /> :
                null
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
              />
            }
          />
          <Route
            path={SAVED_MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={SavedMovies}
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
