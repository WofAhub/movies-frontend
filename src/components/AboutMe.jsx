// --- база
import React from "react";

// -- модули
import Landing from "./Landing";
import aboutMeImg from "../images/Student.jpg";
import { LOGOS_TEXT } from "../utils/constants/constants";

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
                Я родился и живу в деревне Мухосранс, закончил колледж на циркача, но не стал двигаться по профессии.
                Переквалифицирвовался в UI-дизайнера, так как все говорили, что это круто. А я поверил. Хотя не надо было.
                Отучился в школе бизнеса и дизайна B&D, а также на онлайн курсах Contented и стал работать фрилансером,
                чтобы работать на кредит, который был взят для обучения.
                Я люблю суши и деньги. Правда, в деревне есть только хлеб и коровы. Коровы тоже деньги, в своем роде.
                С 2000 года, как только родился, я стал думать кем стать. И всё ещё не придумал.
                Стал кодить, потому что сказали, что актуально. И я поверил...
              </p>
              <p className="aboutMe__github">{LOGOS_TEXT.GITHUB}</p>
            </div>
          </div>
          <img className='aboutMe__student-img' src={aboutMeImg} alt='Фотография студента' />
        </section>
      }
    />
  )
}

export default AboutMe;