import React from 'react';
import AuthAndRegister from './AuthAndRegister';
import { Link } from "react-router-dom";

function Register() {
  return (
    <AuthAndRegister
      authAndRegisterHeading={'Добро пожаловать!'}
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
              required
              className='authAndRegisterImputs__input'
            />
          </fieldset>
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
          <fieldset className='authAndRegisterImputs__fieldset'>
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