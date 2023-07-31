import React from 'react';

import MoviesCard from './MoviesCard';

function MoviesCardList() {
  return (
    <>
      <section className='moviesCardList moviesCardList_mediaScreen'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </section>
    </>
  )
}

export default MoviesCardList;