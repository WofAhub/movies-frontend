// база
import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from './MoviesCard';
import useWindowDimensions from '../hooks/useWindowDemension';
import { MOVIES } from '../utils/constants/constants';
import {
  NUBER_OF_MOVIES_12,
  NUBER_OF_MOVIES_8,
  NUBER_OF_MOVIES_5,
  NUBER_OF_MOVIES_ADD_3,
  NUBER_OF_MOVIES_ADD_2,
} from '../utils/constants/constants';

function MoviesCardList({ searchMovies }) {

  const location = useLocation();
  const pathMovies = location.pathname === MOVIES;
  const windowWidth = useWindowDimensions();

  const [visibleMovies, setVisibleMovies] = useState(0);

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
          searchMovies.slice(0, visibleMovies).map((movies, movie) => {
            return (
              <MoviesCard movies={movies} key={movie} />
            )
          })
        }
      </ul>
      {visibleMovies < searchMovies?.length && pathMovies ?
        <button onClick={setMoreCards} type='button' className='movies__button button'>Ещё</button>
        : null
      }
    </>
  )
}

export default MoviesCardList;