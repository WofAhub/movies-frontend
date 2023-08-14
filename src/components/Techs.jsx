// --- база
import React from 'react';

function Techs() {
  return (
    <section className='techs techs_mediaScreen'>
      <div className='techs__box'>
        <h2 className='landing__heading'>Технологии</h2>
        <span className='landing__line'></span>
        <h3 className='techs__heading'>7 технологий</h3>
        <p className='techs__paragraph'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__techs'>
          <li className='techs__li'>HTML</li>
          <li className='techs__li'>CSS</li>
          <li className='techs__li'>JS</li>
          <li className='techs__li'>React</li>
          <li className='techs__li'>Git</li>
          <li className='techs__li'>Express.js</li>
          <li className='techs__li'>mongoDB</li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;