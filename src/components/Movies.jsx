// --- база
import { React, useEffect, useState } from 'react';
import * as moviesApi from '../utils/MoviesApi';
import * as mainApi from '../utils/MainApi';

// --- модули
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';
import { dataMovies } from '../utils/constants/constants';

function Movies({
  isSaved,
  loggedIn,
  setLoading,
  savedMovies,
  setSavedMovies,
  foundMovies,
  setFoundMovies,
  handleFilterState,
  onCheckbox,
}) {

  // --- localStorage GET
  const localStorageFoundMovies = localStorage.getItem('foundMovies')
  const localStorageSavedMovie = localStorage.getItem('moviesSaved')
  const localStorageMovies = JSON.parse(localStorage.getItem('moviesCurrent'));

  // --- служебное
  const [isCurrentlySaved, setIsCurentlySaved] = useState(false);

  // загрузка данных с LocalStorage, если они есть и если польз-тель залогинился setItem
  useEffect(() => {
    if (!loggedIn) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    if (token) {
      const foundMoviesList = JSON.parse(localStorageFoundMovies) || [];
      const savedMoviesList = JSON.parse(localStorageSavedMovie) || [];
      setFoundMovies(foundMoviesList);
      setSavedMovies(savedMoviesList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);


  // сохранение фильма
  function savingMovie(movie) {
    const isSavedMovie = savedMovies.some(i => i.movieId === movie.movieId);

    if (!isSavedMovie) {
      mainApi
        .uploadMovie(movie)
        .then((newMovie) => {
          setIsCurentlySaved(true);
          localStorage.setItem('moviesSaved', JSON.stringify([newMovie, ...savedMovies]));
          setSavedMovies([newMovie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(`Ошибка в Movies, savingMovie: ${err}`);
        })
    }
  }

  //удаление фильма
  function delitingMovie(movie) {
    const movieToDelete = savedMovies.find(i => i.movieId.toString() === movie.movieId.toString());
    mainApi
      .deleteMovie(movieToDelete._id)
      .then(() => {
        const newMovies = savedMovies.filter((movieSaved) => {
          return movieSaved.movieId !== movieToDelete.movieId;
        });
        setSavedMovies(newMovies);
        setIsCurentlySaved(false);
        localStorage.setItem('moviesSaved', JSON.stringify(newMovies));
      })
      .catch((err) => {
        console.log(`Ошибка в App, delitingMovie: ${err}`);
      })
  }

  // обработка клика по кнопке В-избранное или Удалить
  function handleClickFavOrDelBtn(movie) {
    const isSavedMovie = savedMovies.some(i => i.movieId === movie.movieId);
    if (!movie._id && !isSavedMovie) {
      savingMovie(movie);
    } else {
      delitingMovie(movie);
    }
  }

  // поиск фильмов по названию
  function searchMovies(dataMovie) {
    const foundMoviesList = localStorageMovies.filter(movie => {
      return movie.nameRU.toLowerCase().includes(dataMovie.toLowerCase());
    });
    localStorage.setItem('foundMovies', JSON.stringify(foundMoviesList));
    setFoundMovies(foundMoviesList);

  }

  // получаю карточки с не моего сервера
  function getInitialMovies(movies) {
    setLoading(true);
    moviesApi
      .getMovies()
      .then((data) => {
        dataMovies(data);
        searchMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })

  }

  // проверка фильма: сохранен или нет
  function checkOnSaved(movie) {
    const isSavedMovie = savedMovies ? savedMovies.find((i) => i.movieId.toString() === movie.movieId.toString()) : ``;
    if (isSavedMovie) {
      setIsCurentlySaved(true);
    } else {
      setIsCurentlySaved(false);
    }
  }

  // обработка поиска
  const handleSearchMovies = (movieToFind) => {
    if (!localStorageMovies || localStorageMovies.length <= 0) {
      getInitialMovies(movieToFind);
    } else {
      searchMovies(movieToFind);
    }
  }

  return (
    <>
      <section className='movies movies_mediaScreen'>
        <div className='movies__box'>
          <SearchForm
            onSearch={handleSearchMovies}
            onCheckbox={onCheckbox}
            handleFilterState={handleFilterState}
          />
          <MoviesCardList
            isCurrentlySaved={isCurrentlySaved}
            initialMovies={getInitialMovies}
            foundMovies={foundMovies}
            isSaved={isSaved}
            onClick={handleClickFavOrDelBtn}
            onDelete={delitingMovie}
            checkOnSaved={checkOnSaved}
            savedMovies={savedMovies}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Movies;