// база
import { React } from 'react';
import MoviesCard from './MoviesCard';

function MoviesCardList({ searchMovies, showMoreMovies, visibleMovies }) {

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
      <button onClick={showMoreMovies} type='button' className='movies__button button'>Ещё</button>
    </>
  )
}

export default MoviesCardList;