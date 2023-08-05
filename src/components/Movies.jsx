// база
import React from 'react';

// модули
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';


function Movies({ moviesList }) {

  return (
    <>
      <section className='movies movies_mediaScreen'>
        <div className='movies__box'>
          <SearchForm />
          <MoviesCardList moviesList={moviesList} />
        </div>
        <button type='button' className='movies__button button'>Ещё</button>
      </section>
      <Footer />
    </>
  )
}

export default Movies;