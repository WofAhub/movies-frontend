// база
import { React } from 'react';
import MoviesCard from './MoviesCard';
// import useFormAndValidation from '../hooks/useFormAndValidation';

function MoviesCardList({ searchMovies }) {

  return (
    <>
      <section className='moviesCardList moviesCardList_mediaScreen'>
        {
          searchMovies.map((movies, movie) => {
            return (
              <MoviesCard movies={movies} key={movie} />
            )
          })
        }
      </section>
    </>
  )
}

export default MoviesCardList;