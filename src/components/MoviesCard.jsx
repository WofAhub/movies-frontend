//база
import React from "react";
import { Link } from "react-router-dom";

function MoviesCard({ movie, isSavedMovie, onBtnOfMovie }) {

  //конвертирую минуты в часы и минуты
  let time = movie.duration;
  let hoursAndminutes = `${Math.floor(time / 60)}ч ${time % 60}м`

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
          className={isSavedMovie ? 'moviesCard__button moviesCard__deleteFromFavorite-btn' : 'moviesCard__button moviesCard__favorite-btn'}></button>
        <p className='moviesCard__duration'>{hoursAndminutes}</p>
      </div>
      <Link className='moviesCard__thumbnail' to={movie.trailerLink} target='_blank'>
        <img className='moviesCard__thumbnail moviesCard__thumbnail_img' src={(movie.image?.url && `https://api.nomoreparties.co${movie.image?.url}`) || movie.image} alt={`Превью фильма ${movie.nameRU}`} />
      </Link>
    </li>
  );
}

export default MoviesCard;