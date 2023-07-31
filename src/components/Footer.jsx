import React from "react";

function Footer() {
  return (
    <footer className='footer footer_mediaScreen'>
      <p className='footer__info'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <span className='footer__line'></span>
      <div className='footer__box'>
        <p className='footer__year'>&copy;&nbsp;{(new Date()).getFullYear()}</p>
        <div className='footer__logos'>
          <p className='footer__logo'>Яндекс.Практикум</p>
          <p className='footer__logo'>GitHub</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;