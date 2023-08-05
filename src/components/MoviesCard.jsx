//база
import React from "react";
import { Link } from "react-router-dom";

function MoviesCard({ movies }) {

  const [isSaved, setSaved] = React.useState(false);

  //конвертирую минуты в часы и минуты
  let time = movies.duration;
  let hoursAndminutes = `${Math.floor(time / 60)}ч ${time % 60}м`

  return (
    <li className='moviesCard'>
      <div className='moviesCard__top moviesCard__top_mediaScreen'>
        <h3 className='moviesCard__heading'>{movies.nameRU}</h3>
        <button type='button' onClick={() => setSaved(!isSaved)} className={isSaved ? 'moviesCard__button moviesCard__deleteFromFavorite-btn' : 'moviesCard__button moviesCard__favorite-btn'}></button>
        <p className='moviesCard__duration'>{hoursAndminutes}</p>
      </div>
      <Link className='moviesCard__thumbnail' to={movies.trailerLink} target='_blank'>
        <img className='moviesCard__thumbnail moviesCard__thumbnail_img' src={(movies.image?.url && `https://api.nomoreparties.co${movies.image?.url}`) || movies.image} alt={`Превью фильма ${movies.nameRU}`} />
      </Link>
    </li>
  );
}

export default MoviesCard;