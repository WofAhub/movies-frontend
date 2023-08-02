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

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  // const [savedMovies, setSavedMovies] = useState(false);
  // const [isloading, setLoading] = useState(false);
  // const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  // проверка токена
  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res.data) {
            setCurrentUser(res.data);
            setLoggedIn(true);
            navigate('/movies', { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка в checkToken, в App: ${err.status}`);
        });
    }
  }
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // регистрация
  function register({ name, email, password }) {
    mainApi
      .register(name, email, password)
      .then((res) => {
        console.log(res, 'Это res из register в App.jsx')
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка в регистрации, в App: ${err}`)
      })
  };

  // логин
  function login({ email, password }) {
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.token) {
          console.log(data, "Это res из login в App.jsx")
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка в App, loginUser: ${err}`);
      });
  }

  // получаю и устанавливаю данные пользователя, когда проходит логин
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser || ''}>
      <div className='app'>
        <Routes>
          <Route
            path='/sign-in'
            element={
              <Login
                onLogin={login}
              />
            }
          />
          <Route
            path='/sign-up'
            element={
              <Register
                onRegister={register}
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
                loggedIn={loggedIn}
                element={Profile}
              />
            }
          />
          <Route
            path='*'
            element={
              <NotFoundPage />
            }
          />
        </Routes>
      </div >
    </CurrentUserContext.Provider >
  )
}

export default App;
