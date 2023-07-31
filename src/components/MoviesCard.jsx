import React from "react";

import { Link } from "react-router-dom";

function MoviesCard() {
  const [isSaved, setSaved] = React.useState(false);

  return (
    <div className='moviesCard'>
      <div className='moviesCard__top moviesCard__top_mediaScreen'>
        <h3 className='moviesCard__heading'>Название фильма</h3>
        <button type='button' onClick={() => setSaved(!isSaved)} className={isSaved ? 'moviesCard__button moviesCard__favorite-btn' : 'moviesCard__button moviesCard__deleteFromFavorite-btn'}></button>
        <p className='moviesCard__duration'>1ч 47мин</p>
      </div>
      <Link className='moviesCard__thumbnail' to='#' target='_blank'>
        <img className='moviesCard__thumbnail moviesCard__thumbnail_img' src={'#'} alt='Превью фильма' />
      </Link>
    </div>
  );
}

export default MoviesCard;