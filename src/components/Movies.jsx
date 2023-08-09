// база
import { React, useEffect, useState } from 'react';
import * as moviesApi from '../utils/MoviesApi';

// модули
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Footer from './Footer';

function Movies({ setLoading }) {

  const [moviesList, setMoviesList] = useState([]);
  const [values, setValues] = useState('');

  //получаю фильмы
  async function getMovies() {
    setLoading(true);
    try {
      const movies = await moviesApi.getMovies()
      setLoading(false);
      setMoviesList(movies);
      console.log(console.log(movies, "Это movies из getMovies в Movies.jsx"))
    } catch (err) {
      console.log(`Ошибка в getMovies в Movies.jsx: ${err}`);
    }
  }

  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const searchMovies = moviesList.filter(searchedMovie => {
    return (
      searchedMovie.nameRU.toLowerCase().includes(values.toLowerCase())
    )
  })

  return (
    <>
      <section className='movies movies_mediaScreen'>
        <div className='movies__box'>
          <SearchForm moviesList={moviesList} setValues={setValues} values={values} />
          <MoviesCardList
            searchMovies={searchMovies}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Movies;