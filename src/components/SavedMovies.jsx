import React from "react";

import MoviesCardList from "./MoviesCardList";
import Navigation from './Navigation';
import SearchForm from './SearchForm';
import Footer from './Footer';

function SavedMovies() {
  return (
    <>
      <Navigation />
      <section className='movies movies_mediaScreen'>
        <div className='movies__box'>
          <SearchForm />
          <MoviesCardList />
        </div>
        <button type='button' className='movies__button button'>Ещё</button>
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies;