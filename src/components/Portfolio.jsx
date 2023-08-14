import React from 'react';
import { Link } from 'react-router-dom';

import { LINK_PORTFOLIO_1, LINK_PORTFOLIO_2, LINK_PORTFOLIO_3 } from '../utils/constants/constants';

function Portfolio() {
  return (
    <section className='portfolio portfolio_mediaScreen'>
      <h3 className='portfolio__heading'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__li'><Link to={LINK_PORTFOLIO_1} target="_blank" className='portfolio__link button button_hover'>Статичный сайт</Link></li>
        <li className='portfolio__li'><Link to={LINK_PORTFOLIO_2} target="_blank" className='portfolio__link button button_hover'>Адаптивный сайт</Link></li>
        <li className='portfolio__li'><Link to={LINK_PORTFOLIO_3} target="_blank" className='portfolio__link button button_hover'>Одностраничное приложение</Link></li>
      </ul>
    </section>
  )
}

export default Portfolio;