import React from 'react';
import AuthAndRegister from './AuthAndRegister';
import { Link } from "react-router-dom";

function Login() {
  return (
    <AuthAndRegister
      authAndRegisterHeading={'Рады видеть!'}
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
              required
              className='authAndRegisterImputs__input'
            />
          </fieldset>
          <fieldset className='authAndRegisterImputs__fieldset authAndRegisterImputs__fieldset_margin'>
            <label htmlFor='password' className='authAndRegisterImputs__label'>
              Пароль
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              className='authAndRegisterImputs__input'
            />
            <span className='authAndRegisterImputs__errorMessage'>Что-то не так</span>
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