// база
import { React } from 'react';
// import * as moviesApi from '../utils/MoviesApi';
import MoviesCard from './MoviesCard';

function MoviesCardList({ moviesList }) {

  return (
    <>
      <section className='moviesCardList moviesCardList_mediaScreen'>
        {
          moviesList.map((movies, movie) => {
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