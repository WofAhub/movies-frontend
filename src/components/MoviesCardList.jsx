// --- база
import { React, useState, useEffect } from 'react';
import MoviesCard from './MoviesCard';
import useWindowDimensions from '../hooks/useWindowDemension';
import { useLocation } from 'react-router-dom';
import { MOVIES } from '../utils/constants/constants';

// --- модули
import {
  NUBER_OF_MOVIES_12,
  NUBER_OF_MOVIES_8,
  NUBER_OF_MOVIES_5,
  NUBER_OF_MOVIES_ADD_3,
  NUBER_OF_MOVIES_ADD_2,
} from '../utils/constants/constants';

function MoviesCardList({ setLoading, foundMovies, savedMovies, onBtnOfMovie, onSavedPage = false }) {

  function isSavedMovie(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);
  }

  // --- юзы
  const location = useLocation();
  const pathMovies = location.pathname === MOVIES;
  const windowWidth = useWindowDimensions();

  // -- отображение фильмов
  const [visibleMovies, setVisibleMovies] = useState(0);

  // определение размеров экрана
  const desktopSize = windowWidth > 1024;
  const tabletSize = windowWidth > 480 && windowWidth <= 768;

  // адаптация кол-во карточек под размер экрана
  useEffect(() => {
    if (
      [
        NUBER_OF_MOVIES_12,
        NUBER_OF_MOVIES_8,
        NUBER_OF_MOVIES_5,
        0,
      ].includes(visibleMovies)
    ) {
      setVisibleMovies(
        desktopSize
          ? NUBER_OF_MOVIES_12
          : tabletSize
            ? NUBER_OF_MOVIES_8
            : NUBER_OF_MOVIES_5
      );
    }
    // реадаптация, если размер экрана был изменен
    if (
      desktopSize &&
      visibleMovies % 3 !== 0 &&
      ![
        NUBER_OF_MOVIES_12,
        NUBER_OF_MOVIES_8,
        NUBER_OF_MOVIES_5,
        0,
      ].includes(visibleMovies)
    ) {
      setVisibleMovies((prevVal) =>
        prevVal % 3 === 1 ? prevVal + 2 : prevVal + 1
      );
    }

    if (tabletSize && visibleMovies % 2 !== 0) {
      setVisibleMovies((prevVal) => prevVal + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  // кнопка "ещё"
  function setMoreCards() {
    setVisibleMovies(
      (prevVal) =>
        prevVal +
        (desktopSize
          ? NUBER_OF_MOVIES_ADD_3
          : tabletSize
            ? NUBER_OF_MOVIES_ADD_2
            : NUBER_OF_MOVIES_ADD_2
        )
    )
  }
  return (
    <>
      <ul className='moviesCardList moviesCardList_mediaScreen'>
        {
          foundMovies.slice(0, visibleMovies).map((movie) => {
            return (
              <MoviesCard
                movie={movie}
                key={movie.movieId}
                isSavedMovie={isSavedMovie(movie)}
                onBtnOfMovie={onBtnOfMovie}
                setLoading={setLoading}
                onSavedPage={onSavedPage}
              />
            )
          })
        }
      </ul>
      {visibleMovies < foundMovies?.length && pathMovies ?
        <button onClick={setMoreCards} type='button' className='movies__button button'>Ещё</button>
        : null
      }
    </>
  )
}

export default MoviesCardList;