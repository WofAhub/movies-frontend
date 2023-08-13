import { React, useState, useEffect } from "react";

import SearchResults from "./SearchResults";
import SearchForm from './SearchForm';
import Footer from './Footer';
import searchMovies from "../utils/functions/searchMovies";

function SavedMovies({
  onDelete,
  savedMovies
}) {

  const [foundMovies, setFoundMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShortMoviesSelected, setShortMoviesSelected] = useState(false);

  function submitSearch({ searchQuery, isShortMoviesSelected }) {
    setSearchQuery(searchQuery);
    setShortMoviesSelected(isShortMoviesSelected);
  }

  function toggleCheckbox(value) {
    setShortMoviesSelected(value);
  }

  useEffect(() => {
    if (savedMovies) {
      const foundMovies = searchMovies(
        savedMovies,
        searchQuery,
        isShortMoviesSelected,
      );
      setFoundMovies(foundMovies);
    }
  }, [savedMovies, searchQuery, isShortMoviesSelected]);

  async function handleBtnClickOnMovie(movie) {
    const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId,
    );
    await onDelete(savedMovie);
  }

  return (
    <>
      <section className='movies movies_mediaScreen'>
        <div className='movies__box'>
          <SearchForm
            onSubmit={submitSearch}
            toggleCheckbox={toggleCheckbox}
            defaultSearchQuery={searchQuery}
            defaultMoviesSelected={isShortMoviesSelected}
          />
          <SearchResults
            foundMovies={foundMovies}
            savedMovies={savedMovies}
            onBtnOfMovie={handleBtnClickOnMovie}
            onSavedPage
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies;