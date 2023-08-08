// база
import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from './MoviesCard';
import useWindowDimensions from '../hooks/useWindowDemension';

function MoviesCardList({ searchMovies }) {

  const [visibleMovies, setVisibleMovies] = useState(12);

  const location = useLocation();
  const pathMovies = location.pathname === '/movies';
  const windowWidth = useWindowDimensions();

  // кнопка "еще"
  function showMoreMovies() {
    if (windowWidth >= 1280) {
      setVisibleMovies(prevValue => prevValue + 4)
    } else if (windowWidth >= 768) {
      setVisibleMovies(prevValue => prevValue + 4)
    } else if (windowWidth >= 480) {
      setVisibleMovies(prevValue => prevValue + 5)
    } else if (windowWidth >= 320) {
      setVisibleMovies(prevValue => prevValue + 5)
    } else {
      setVisibleMovies(prevValue => prevValue + 4)
    }
  }

  return (
    <>
      <section className='moviesCardList moviesCardList_mediaScreen'>
        <ul className='moviesCardList moviesCardList_mediaScreen'>
          {
            searchMovies.slice(0, visibleMovies).map((movies, movie) => {
              return (
                <MoviesCard movies={movies} key={movie.movieID} />
              )
            })
          }
        </ul>
      </section>
      {visibleMovies < searchMovies?.length && pathMovies ?
        <button onClick={showMoreMovies} type='button' className='movies__button button'>Ещё</button>
        : null
      }
    </>
  )
}

export default MoviesCardList;