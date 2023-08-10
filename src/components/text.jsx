import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import * as MoviesApi from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi';

function App() {

  const shortMoviesDuration = 40;

  const history = useHistory();

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(null);
  const [ currentUser, setCurrentUser ] = React.useState([]);
  const [ moviesFound, setMoviesFound ] = React.useState([]);
  const [ errMessage, setErrMessage ] = React.useState('');
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ isFindingErr, setFindingErr ] = React.useState(false);
  const [ isCurrentlySaved, setIsCurentlySaved ] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn) return;
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;
    const savedFoundMovies = localStorage.getItem('moviesFound');
    const moviesSavedByUser = localStorage.getItem('moviesSaved');
    if (jwt) {
      const newMoviesFound = JSON.parse(savedFoundMovies) || [];
      const newSavedMovies = JSON.parse(moviesSavedByUser) || [];
      setMoviesFound(newMoviesFound);
      setSavedMovies(newSavedMovies);
    }
  }, [isLoggedIn]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
      if (jwt){
      MainApi.getContent(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          if(location.pathname.toString() === '/signin'){
            history.push('/movies');
          }
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log( `Ошибка 400: Токен не передан или передан не в том формате.` );
        }
        if (err === 401) {
          console.log( 'Ошибка 401: Переданный токен некорректен.' );
        } else {
          console.log('Что-то пошло не так');
        }
      });
    }
  }

  React.useEffect(() => {
    tokenCheck()
  }, []);

  const adjustData = (movies) => {
    const newMovies = movies.map((movie) => {
      return {
        movieId: `${movie.id}`,
        country: `${movie.country ? `${movie.country}` : `Данные о стране отсутствуют.`}`,
        director: `${movie.director ? `${movie.director}` : `Данные о режиссёре отсутствуют.`}`,
        duration: `${movie.duration ? `${movie.duration}` : `0`}`,
        year: `${movie.year ? `${movie.year}` : `0`}`,
        description: `${movie.description ? `${movie.description}` : `Описание отсутствует.`}`,
        image: `${movie.image && movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : `https://sun9-21.userapi.com/impg/OBUbO8dqPtjzr0BXCnW4hDXaWrNzse_DduMJfA/7VsYiVFOOW8.jpg`}`,
        trailer: `${movie.trailerLink ?  `${movie.trailerLink}` : `https://youtube.com`}`,
        thumbnail: `${movie.image && movie.image.formats && movie.image.formats.thumbnail && movie.image.formats.thumbnail.url ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` : `https://sun9-21.userapi.com/impg/OBUbO8dqPtjzr0BXCnW4hDXaWrNzse_DduMJfA/7VsYiVFOOW8.jpg`}`,
        nameRU: `${movie.nameRU}` || `Название отсутствует.`,
        nameEN: `${movie.nameEN}` || `Название отсутствует.`
      }
    });
    localStorage.setItem('moviesCurrent', JSON.stringify(newMovies) );
  }

  const handleRegister = (password, email, name) => {
    MainApi.register(password, email, name)
      .then((res) => {
        if (res.status !== 400) {
          handleLogin(password, email);
          history.push('/movies');
          setErrMessage(`Регистрация прошла успешно!`);
        }
      })
      .catch((err) => {
        if (err === 400) {
          setErrMessage( `Ошибка 400: Введены неверные данные пользователя.` );
        }
        if (err === 409) {
          setErrMessage( `Ошибка 409: Пользователь с такими данными уже зарегистрирован.` )
        }
        else {
          setErrMessage('Что-то пошло не так...')
        }
      })
  }

  const handleLogin = (password, email) => {
    MainApi.authorize(password, email)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        history.push('/movies');
      }
    })
    .catch((err) => {
      if (err === 400) {
        setErrMessage( `Ошибка 400: Введены неверные данные пользователя.` );
      }
      if (err === 401) {
        setErrMessage( 'Ошибка 401: Пользователь с такой почтой не найден.' );
      } else {
        setErrMessage('Что-то пошло не так.');
      }
    })
  }

  function handleUpdateUser({name, email}) {
    MainApi.updateUserInfo(name, email).then((res) => {
      setCurrentUser(res);
      setErrMessage('Обновление прошло успешно!');
    })
    .catch((err) => {
      setErrMessage(err);
    })
  }

  function handleSaveMovie(movie) {
    const isSavedMovie = savedMovies.some(i => i.movieId === movie.movieId);

    if (!isSavedMovie) {

      MainApi.addNewMovie(movie)
        .then((newMovie) => {

          setSavedMovies([newMovie, ...savedMovies]);
          setIsCurentlySaved(true);
          localStorage.setItem('moviesSaved', JSON.stringify([newMovie, ...savedMovies]) );
      })
      .catch((err) => {
        setErrMessage(err);
      })
    }
  }

  function handleClickMovieButton(movie) {
    const isSavedMovie = savedMovies.some(i => i.movieId === movie.movieId);
    if (!movie._id && !isSavedMovie) {
      handleSaveMovie(movie);
    } else {
      handleDeleteMovie(movie);
    }
  }

  function handleDeleteMovie(movie) {
    const savedMovieToDelete = savedMovies.find(i => i.movieId.toString() === movie.movieId.toString());
    MainApi.deleteCard(savedMovieToDelete._id)
      .then(() => {

        const newMovies = savedMovies.filter((movieSaved) => {
          return movieSaved.movieId !== savedMovieToDelete.movieId;
        });
        setSavedMovies(newMovies);
        setIsCurentlySaved(false);
        localStorage.setItem('moviesSaved', JSON.stringify(newMovies) );
    })
    .catch((err) => {
      setErrMessage(err);
    })
  }

  React.useEffect(() =>{
    if (!isLoggedIn) return;
    const jwt = localStorage.getItem('jwt');
    tokenCheck();
    MainApi.getContent(jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  function getInitialMovies (dataMovie) {

    setIsLoading(true);
    MoviesApi.getMovies()
      .then((data) => {
        adjustData(data);
        searchMovies(dataMovie);
      })
      .catch((err) => {
        setFindingErr(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setFindingErr(false);
      })

  }

  React.useEffect(() => {
    if (!isLoggedIn) return;
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      MainApi.getSavedMovies()
      .then((res) => {
        if (res) {
          setSavedMovies(res);
          localStorage.setItem('moviesSaved', JSON.stringify(res) );
        }
      })
      .catch((err) => {
        if (err === 400) {
          setErrMessage( `Ошибка 400: Токен не передан или передан не в том формате.` );
        }
        if (err === 401) {
          setErrMessage( 'Ошибка 401: Переданный токен некорректен.' );
        } else {
          setErrMessage('Что-то пошло не так');
        }
      })
    }

  }, [isLoggedIn]);

  function searchMovies (dataMovie) {
    const localMovies = JSON.parse(localStorage.getItem('moviesCurrent'));
    const moviesFoundArray = localMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(dataMovie.toLowerCase());
    });
    setMoviesFound(moviesFoundArray);
    localStorage.setItem('moviesFound', JSON.stringify(moviesFoundArray) );

  }

  function searchSavedMovies (movieToFind) {
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const foundMoviesArray = localSavedMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(movieToFind.toLowerCase());
    });
    setSavedMovies(foundMoviesArray);
  }

  function filterMovies () {
    const filteredMovies =  moviesFound.filter((i) => i.duration <= 40);
    setMoviesFound(filteredMovies);
  }
  setItem
  function filterSavedMovies() {
    const localSavedMovies = JSON.parse(localStorage.getItem('moviesSaved'));
    const moviesFilteredArray = localSavedMovies.filter(movie => {
      return movie.duration <= shortMoviesDuration;
    });
    setSavedMovies(moviesFilteredArray);
  }

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesFound');
    localStorage.removeItem('moviesSaved');
    localStorage.removeItem('moviesCurrent');
    setIsLoggedIn(false);
    history.push('/signup');
  }

  function checkIfSaved (movie) {
    const isAddedMovie = savedMovies ? savedMovies.find((i) => i.movieId.toString() === movie.movieId.toString()) : ``;
    if (isAddedMovie) {
      setIsCurentlySaved(true);
    } else {
      setIsCurentlySaved(false);
    }
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header
          isLoggedIn={isLoggedIn}/>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>

          <ProtectedRoute exact path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            onSearch={searchMovies}
            initialMovies={getInitialMovies}
            foundMovies={moviesFound}
            isSaved={false}
            onSavedMovie={handleClickMovieButton}
            onDeleteMovie={handleDeleteMovie}
            isLoading={isLoading}
            onFilter={filterMovies}
            onErr={isFindingErr}
            isCurrentlySaved={isCurrentlySaved}
            checkIfSaved={checkIfSaved}
            savedMovies={savedMovies}
          />

          <ProtectedRoute exact path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            foundMovies={savedMovies}
            isSaved={true}
            isLoading={isLoading}
            onDeleteMovie={handleDeleteMovie}
            onSearch={searchSavedMovies}
            onFilter={filterSavedMovies}
          />

          <ProtectedRoute exact path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            onUpdateUser={handleUpdateUser}
            onSignOut={onSignOut}
          />

          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              onError={errMessage}/>
          </Route>

          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              onError={errMessage}/>
          </Route>

          <Route path="*">
            <PageNotFound/>
          </Route>

        </Switch>

        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;