import { React, useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Profile({ logout }) {

  const currentUserContext = useContext(CurrentUserContext);

  return (
    <section className='profile profile_mediaScreen'>
      <h1 className='authAndRegister__heading'>Привет, {currentUserContext.name}</h1>
      <div className='profile__grid'>
        <p className='profile__paragraph profile__paragraph_nameLeft'>Имя</p>
        <p className='profile__paragraph profile__paragraph_nameRight'>{currentUserContext.name}</p>
        <span className='profile__line'></span>
        <p className='profile__paragraph profile__paragraph_emailLeft'>Email</p>
        <p className='profile__paragraph profile__paragraph_emailRight'>{currentUserContext.email}</p>
      </div>
      <div className='profile__buttons'>
        <button type='button' className='profile__button button'>Редактировать</button>
        <button type='button' onClick={logout} className='profile__button button'>Выйти из аккаунта</button>
      </div>
    </section>
  );
};

export default Profile;