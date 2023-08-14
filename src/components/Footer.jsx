// --- база
import React from 'react';

// -- модули
import { LOGOS_TEXT } from '../utils/constants/constants'

function Footer() {
  return (
    <footer className='footer footer_mediaScreen'>
      <p className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <span className='footer__line'></span>
      <div className='footer__box'>
        <p className='footer__year'>&copy;&nbsp;{(new Date()).getFullYear()}</p>
        <div className='footer__logos'>
          <p className='footer__logo'>{LOGOS_TEXT.YANDEX_PRAKTIKUM}</p>
          <p className='footer__logo'>{LOGOS_TEXT.GITHUB}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;