import React from 'react';
import { Link } from "react-router-dom";

import AuthAndRegister from './AuthAndRegister';
import useFormAndValidation from '../hooks/useFormAndValidation';

function Login({ onLogin }) {

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: '',
    password: '',
  });

  // подтверждение
  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <AuthAndRegister
      authAndRegisterHeading={'Рады видеть'}
      onSubmit={handleSubmit}
      isValid={isValid}
      authAndRegisterImputs={
        <>
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
              value={values.email}
              onChange={handleChange}
              required
            />
            <span className='authAndRegisterImputs__errorMessage'>{errors.email}</span>
          </fieldset>
          <fieldset className='authAndRegisterImputs__fieldset authAndRegisterImputs__fieldset_margin'>
            <label htmlFor='password' className='authAndRegisterImputs__label'>
              Пароль
            </label>
            <input
              id='password'
              name='password'
              type='password'
              className={errors.password ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              value={values.password}
              onChange={handleChange}
              placeholder='Пароль'
              required
            />
            <span className='authAndRegisterImputs__errorMessage'>{errors.password}</span>
          </fieldset>
        </>
      }
      authAndRegisterBtnSubmit={'Войти'}
      registerOrLogin={
        <div className='registerOrLogin'>
          <p className='registerOrLogin__txt'>Ещё не зарегистрированы?</p>
          <Link to='/sign-up' type='button' className='registerOrLogin__regOrLog-btn'>Регистрация</Link>
        </div>
      }
    />
  )
}

export default Login;