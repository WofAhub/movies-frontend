// --- база
import React from 'react';

// -- модули
import Landing from './Landing';

function AboutProject() {
  return (
    <Landing
      landingHeading={'О проекте'}
      landingChild={
        <>
          <section className='aboutProject aboutProject_mediaScreen'>
            <div className='aboutProject__box aboutProject__box_mediaScreen'>
              <h3 className='aboutProject__heading'>Дипломный проект включал 5 этапов</h3>
              <h3 className='aboutProject__heading'>На выполнение диплома ушло 5 недель</h3>
              <p className='aboutProject__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
              <p className='aboutProject__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className='aboutProject__timeline aboutProject__timeline_mediaScreen'>
              <p className='aboutProject__timeline-p'>1 неделя</p>
              <p className='aboutProject__timeline-p'>4 недели</p>
              <p className='aboutProject__underTimeline-p'>Back-end</p>
              <p className='aboutProject__underTimeline-p'>Front-end</p>
            </div>
          </section>
        </>
      }
    />
  )
}

export default AboutProject;