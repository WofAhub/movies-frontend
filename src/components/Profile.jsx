import { React, useContext } from 'react';
import Navigation from './Navigation';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Profile() {

  const currentUserContext = useContext(CurrentUserContext)

  return (
    <>
      <Navigation />
      <section className='profile profile_mediaScreen'>
        <h1 className='authAndRegister__heading'>`Привет,${currentUserContext.name}`</h1>
        <div className='profile__grid'>
          <p className='profile__paragraph profile__paragraph_nameLeft'>Имя</p>
          <p className='profile__paragraph profile__paragraph_nameRight'>{currentUserContext.name}</p>
          <span className='profile__line'></span>
          <p className='profile__paragraph profile__paragraph_emailLeft'>Email</p>
          <p className='profile__paragraph profile__paragraph_emailRight'>{currentUserContext.email}</p>
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