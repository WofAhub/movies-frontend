// база
import { React } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from './MoviesCard';

function MoviesCardList({ searchMovies, showMoreMovies, visibleMovies }) {
  const location = useLocation();
  const pathMovies = location.pathname === '/movies';

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