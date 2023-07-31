import React from 'react';
import promoImg from '../images/Spiral.svg';

function Promo() {
  return (
    <section className='promo promo_mediaScreen'>
      <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
      <img className='promo__img' src={promoImg} alt='Спираль изображение' />
    </section>
  );
}

export default Promo;