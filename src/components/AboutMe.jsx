import React from "react";

import Landing from "./Landing";
import aboutMeImg from "../images/Student.jpg";

function AboutMe() {
  return (
    <Landing
      landingHeading={'Студент'}
      landingChild={
        <section className='aboutMe aboutMe_mediaScreen'>
          <div className='aboutMe__info'>
            <div className='aboutMe__info-top'>
              <h3 className='aboutMe__heading'>Андрей</h3>
              <p className='aboutMe__aboutAndDate'>Не пропащий, но планирующий, 23 года</p>
            </div>
            <div className='aboutMe__info-paragraph'>
              <p className='aboutMe__paragraph'>
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
              <p className="aboutMe__github">GitHub</p>
            </div>
          </div>
          <img className='aboutMe__student-img' src={aboutMeImg} alt='Фотография студента' />
        </section>
      }
    />
  )
}

export default AboutMe;