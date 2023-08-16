// --- база
import React from "react";
import { Link, useLocation } from "react-router-dom";

// -- модули
import { MOVIES, SAVED_MOVIES } from '../utils/constants/constants'

function MoviesCard({ movie, isSavedMovie, onBtnOfMovie }) {

  //конвертирую минуты в часы и минуты
  let time = movie.duration;
  let hoursAndminutes = `${Math.floor(time / 60)}ч ${time % 60}м`

  const { pathname } = useLocation();
  const pathMovies = pathname === MOVIES;
  const pathSavedMovies = pathname === SAVED_MOVIES

  async function click() {
    try {
      await onBtnOfMovie(movie);
    } catch (err) {
      console.log(`${err} ошибка в click`)
    }
  }

  return (
    <li className='moviesCard'>
      <div className='moviesCard__top moviesCard__top_mediaScreen'>
        <h3 className='moviesCard__heading'>{movie.nameRU}</h3>
        <button
          type='button'
          onClick={click}
          className={
            isSavedMovie && pathMovies
              ? 'moviesCard__button moviesCard__savedMovie'
              : pathSavedMovies
              ?   'moviesCard__button moviesCard__deleteFromFavorite-btn' 
              : 'moviesCard__button moviesCard__favorite-btn'
          }
        />
        <p className='moviesCard__duration'>{hoursAndminutes}</p>
      </div>
      <Link className='moviesCard__thumbnail' to={movie.trailerLink} target='_blank'>
        <img className='moviesCard__thumbnail moviesCard__thumbnail_img' src={(movie.image?.url && `https://api.nomoreparties.co${movie.image?.url}`) || movie.image} alt={`Превью фильма ${movie.nameRU}`} />
      </Link>
    </li>
  );
}

export default MoviesCard;