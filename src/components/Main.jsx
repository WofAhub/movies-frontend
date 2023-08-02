import React from 'react';

import Promo from './Promo';
import AboutProject from './AboutProject';
import Techs from './Techs';
import AboutMe from './AboutMe';
import Portfolio from './Portfolio';
import Footer from './Footer';

function Main() {
  return (
    <main className='main main_mediaScreen'>
      <Promo />
      <AboutProject />
      <Techs />
      <div className='main__box main__box_mediaScreen'>
        <AboutMe />
        <Portfolio />
      </div>
      <Footer />
    </main>
  );
}

export default Main;