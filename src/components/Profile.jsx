import { React, useContext, useState } from 'react';
import * as mainApi from '../utils/MainApi';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';

function Profile({ logout, setLoading, setCurrentUser }) {

  // запрос обновления информации юзера
  async function updateUserInfo(data) {
    setLoading(true);
    try {
      const newUser = await mainApi.editUserInfo(data)
      setCurrentUser(newUser);
      setLoading(false);
    } catch (err) {
      console.log(`Ошибка в App, handleUpdateUser: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  const [editMode, setEditMode] = useState(false);
  const currentUserContext = useContext(CurrentUserContext);
  const { email, name } = currentUserContext;
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation({
    email: '',
    name: '',
  });

  function turnOnEditMode() {
    setEditMode(true);
  }

  function turnOffEditMode() {
    setEditMode(false);
    resetForm();
  }

  // подтверждение
  function handleSubmit(evt) {
    evt.preventDefault();
    updateUserInfo(values);
    turnOffEditMode();
  }

  return (
    <section className='profile profile_mediaScreen'>
      <h1 className='authAndRegister__heading authAndRegister__heading_profile'>{editMode ? 'Редактирование' : `Привет, ${name}`}</h1>
      <form onSubmit={handleSubmit} className='profile__grid'>
        <label htmlFor='profile_name' className={errors.name ? 'profile__paragraph profile__paragraph_nameLeft profile__paragraph_error' : 'profile__paragraph profile__paragraph_nameLeft'}>{errors.name ? errors.name : 'Имя'}</label>
        <input
          id='profile_name'
          name='name'
          type='name'
          minLength='2'
          maxLength='40'
          className={editMode ? 'profile__paragraph profile__paragraph_nameRight profile__paragraph_active' : 'profile__paragraph profile__paragraph_nameRight'}
          placeholder={editMode ? 'Введите новое имя' : name}
          value={values?.name || ''}
          onChange={handleChange}
          required
        />
        <span className='profile__line'></span>
        <label htmlFor='profile_email' className={errors.email ? 'profile__paragraph profile__paragraph_emailLeft profile__paragraph_error' : 'profile__paragraph profile__paragraph_emailLeft'}>{errors.email ? errors.email : 'Email'}</label>
        <input
          id='profile_email'
          name='email'
          type='email'
          className={editMode ? 'profile__paragraph profile__paragraph_emailRight profile__paragraph_active' : 'profile__paragraph profile__paragraph_emailRight'}
          placeholder={editMode ? 'Введите новый email' : email}
          value={values?.email || ''}
          onChange={handleChange}
          required
        />
        <div className='profile__buttons'>
          {editMode ?
            <div className='profile__buttons_editMode'>
              <button type='submit' className={isValid ? 'profile__button button' : 'profile__button profile__button_disable button'}>Сохранить</button>
              <button type='button' onClick={turnOffEditMode} className='profile__button button'>Отмена</button>
            </div>
            :
            <button type='button' onClick={turnOnEditMode} className='profile__button button'>Редактировать</button>
          }
          <button type='button' onClick={logout} className='profile__button button'>Выйти из аккаунта</button>
        </div>
      </form>
    </section>
  );
};

export default Profile;