// база
import { React, useState } from 'react';

// модули
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';

function Movies({ moviesList }) {

  const [values, setValues] = useState('');

  const searchMovies = moviesList.filter(searchedMovie => {
    return ( 
      searchedMovie.nameRU.toLowerCase().includes(values.toLowerCase())
      )
  })

  return (
    <>
      <section className='movies movies_mediaScreen'>
        <div className='movies__box'>
          <SearchForm moviesList={moviesList} setValues={setValues} values={values}/>
          <MoviesCardList searchMovies={searchMovies}/>
        </div>
        <button type='button' className='movies__button button'>Ещё</button>
      </section>
      <Footer />
    </>
  )
}

export default Movies;