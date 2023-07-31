import React from 'react';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className='portfolio portfolio_mediaScreen'>
      <h3 className='portfolio__heading'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__li'><Link to='https://wofahub.github.io/mesto-react/' target="_blank" className='portfolio__link button button_hover'>Статичный сайт</Link></li>
        <li className='portfolio__li'><Link to='#' target="_blank" className='portfolio__link button button_hover'>Адаптивный сайт</Link></li>
        <li className='portfolio__li'><Link to='#' target="_blank" className='portfolio__link button button_hover'>Одностраничное приложение</Link></li>
      </ul>
    </section>
  )
}

export default Portfolio;