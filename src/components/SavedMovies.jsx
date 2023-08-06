import React from "react";

import MoviesCardList from "./MoviesCardList";
import SearchForm from './SearchForm';
import Footer from './Footer';

function SavedMovies() {
  return (
    <>
      <section className='movies movies_mediaScreen'>
        <div className='movies__box'>
          <SearchForm />
          <MoviesCardList />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies;