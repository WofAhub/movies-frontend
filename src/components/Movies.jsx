// --- база
import { React, useEffect, useState } from 'react';
import * as moviesApi from '../utils/MoviesApi';

// --- модули
import SearchForm from './SearchForm';
import Footer from './Footer';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/constants/constants';
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
  const lsFoundMoviesList = getFromLocalStorage('foundMoviesList') ?? [];
  const lsShortMoviesSelected = localStorage.getItem('toggleCheckbox') ?? false;
  const lsSearchQuery = localStorage.getItem('searchQuery') ?? '';

  // -- фильмы
  const [moviesList, setMoviesList] = useState(null);
  const [foundMoviesList, setfoundMoviesList] = useState(lsFoundMoviesList);
  const [isShortMoviesSelected, setShortMoviesSelected] = useState(lsShortMoviesSelected);
  const [searchQuery, setSearchQuery] = useState(lsSearchQuery);

  // -- служебные
  const [isAnErrorHasOccured, setisAnErrorHasOccured] = useState(false);

  useEffect(() => {
    saveToLocalStorage('foundMoviesList', foundMoviesList);
    localStorage.setItem('searchQuery', searchQuery)
    localStorage.setItem('toggleCheckbox', isShortMoviesSelected);
  }, [foundMoviesList, isShortMoviesSelected, searchQuery])

  useEffect(() => {
    if (moviesList) {
      const foundMovies = searchMovies(moviesList, searchQuery, isShortMoviesSelected)
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

  function toggleCheckbox(value) {
    setShortMoviesSelected(value);
    if (!moviesList) getMovies();
  }

  function submitSeacrh({ query, isShortMoviesSelected }) {
    setShortMoviesSelected(isShortMoviesSelected);
    setSearchQuery(query);
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
            onSubmit={submitSeacrh}
            toggleCheckbox={toggleCheckbox}
            searchQuery={searchQuery}
            isShortSelected={isShortMoviesSelected}
            setLoading={setLoading}
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