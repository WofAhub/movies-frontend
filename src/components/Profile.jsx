import React from 'react';
import Navigation from './Navigation';

function Profile() {

  return (
    <>
      <Navigation />
      <section className='profile profile_mediaScreen'>
        <h1 className='authAndRegister__heading'>Привет, Виталий</h1>
        <div className='profile__grid'>
          <p className='profile__paragraph profile__paragraph_nameLeft'>Имя</p>
          <p className='profile__paragraph profile__paragraph_nameRight'>Виталий</p>
          <span className='profile__line'></span>
          <p className='profile__paragraph profile__paragraph_emailLeft'>Email</p>
          <p className='profile__paragraph profile__paragraph_emailRight'>pochta@yandex.ru</p>
        </div>
        <div className='profile__buttons'>
          <button className='profile__button button'>Редактировать</button>
          <button className='profile__button button'>Выйти из аккаунта</button>
        </div>
      </section>
    </>
  );
};

export default Profile;