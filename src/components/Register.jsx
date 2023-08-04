import { React } from 'react';
import { Link } from "react-router-dom";

import AuthAndRegister from './AuthAndRegister';
import useFormAndValidation from '../hooks/useFormAndValidation';

function Register({ onRegister, errorMessage }) {

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: '',
    password: '',
    name: '',
  });

  // подтверждение
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values);
  }

  return (
    <AuthAndRegister
      authAndRegisterHeading={'Добро пожаловать'}
      onSubmit={handleSubmit}
      isValid={isValid}
      errorMessage={errorMessage}
      authAndRegisterImputs={
        <>
          <fieldset className='authAndRegisterImputs__fieldset'>
            <label htmlFor='name' className='authAndRegisterImputs__label'>
              Имя
            </label>
            <input
              id='name'
              name='name'
              type='name'
              minLength='2'
              maxLength='40'
              className={errors.name ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              placeholder='Ваше имя'
              value={values?.name || ''}
              onChange={handleChange}
              required
            />
            <span className='authAndRegisterImputs__errorMessage'>{errors.name}</span>
          </fieldset>
          <fieldset className='authAndRegisterImputs__fieldset'>
            <label htmlFor='email' className='authAndRegisterImputs__label'>
              E-mail
            </label>
            <input
              id='email'
              name='email'
              type='email'
              className={errors.email ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              placeholder='Ваш e-mail'
              value={values?.email || ''}
              onChange={handleChange}
              required
            />
            <span className='authAndRegisterImputs__errorMessage'>{errors.email}</span>
          </fieldset>
          <fieldset className='authAndRegisterImputs__fieldset'>
            <label htmlFor='password' className='authAndRegisterImputs__label'>
              Пароль
            </label>
            <input
              id='password'
              name='password'
              type='password'
              className={errors.password ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              placeholder='Придумайте надёжный пароль'
              value={values?.password || ''}
              onChange={handleChange}
              required
            />
            <span className='authAndRegisterImputs__errorMessage'>{errors.password}</span>
          </fieldset>
        </>
      }
      authAndRegisterBtnSubmit={'Зарегистрироваться'}
      registerOrLogin={
        <div className='registerOrLogin'>
          <p className='registerOrLogin__txt'>Уже зарегистрировались?</p>
          <Link to='/sign-in' type='button' className='registerOrLogin__regOrLog-btn'>Войти</Link>
        </div>
      }
    />
  )
}

export default Register;