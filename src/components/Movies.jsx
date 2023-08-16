// --- база
import { React, useEffect, useState } from 'react';
import * as moviesApi from '../utils/MoviesApi';

// --- модули
import SearchForm from './SearchForm';
import Footer from './Footer';
import searchMovies from '../utils/functions/searchMovies';
import { dataMovies } from '../utils/constants/constants';
import SearchResults from './SearchResults';

function Movies({
  setLoading,
  savedMovies,
  onDelete,
  onSave,
  loading,
}) {

  // -- localStorage GET
  const defaultMoviesList = JSON.parse(localStorage.getItem('foundMoviesList')) ?? [];
  const defaultMoviesSelected = JSON.parse(localStorage.getItem('toggleCheckbox')) ?? false;
  const defaultSearchQuery = localStorage.getItem('searchQuery') ?? '';

  // -- фильмы
  const [moviesList, setMoviesList] = useState(null);
  const [foundMoviesList, setfoundMoviesList] = useState(defaultMoviesList);
  const [isShortMoviesSelected, setShortMoviesSelected] = useState(defaultMoviesSelected);
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);

  // -- служебные
  const [isAnErrorHasOccured, setisAnErrorHasOccured] = useState(false);

  useEffect(() => {
    localStorage.setItem('foundMoviesList',  JSON.stringify(foundMoviesList));
    localStorage.setItem('searchQuery', searchQuery)
    localStorage.setItem('toggleCheckbox', isShortMoviesSelected);
  }, [foundMoviesList, isShortMoviesSelected, searchQuery])

  useEffect(() => {
    if (moviesList) {
      const foundMovies = searchMovies(
        moviesList,
        searchQuery,
        isShortMoviesSelected)
      setfoundMoviesList(foundMovies);
    }
  }, [moviesList, searchQuery, isShortMoviesSelected])

  async function getMovies() {
    setisAnErrorHasOccured(false);
    setLoading(true);
    try {
      let movies = await moviesApi.getMovies();
      movies = movies.map(dataMovies);
      setMoviesList(movies);

      setLoading(false);

    } catch {
      console.log('Ошибка в getMovies, App')
      setisAnErrorHasOccured(true)

    } finally {
      setLoading(false);
      setisAnErrorHasOccured(false);
    }
  }

  function submitSearch({ searchQuery, isShortMoviesSelected }) {
    setSearchQuery(searchQuery);
    setShortMoviesSelected(isShortMoviesSelected);
    if (!moviesList) getMovies();
  }

  function toggleCheckbox(value) {
    setShortMoviesSelected(value);
    if (!moviesList) getMovies();
  }

  async function handleBtnClickOnMovie(movie) {
    const isSavedAlready = savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);
    if (isSavedAlready) {
      const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.movieId);
      await onDelete(savedMovie);
    } else {
      await onSave(movie);
    }
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
          {searchQuery &&
            <SearchResults
              foundMovies={foundMoviesList}
              savedMovies={savedMovies}
              onBtnOfMovie={handleBtnClickOnMovie}
              isAnErrorHasOccured={isAnErrorHasOccured}
              loading={loading}
            />
          }
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Movies;