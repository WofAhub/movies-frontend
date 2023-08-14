// база
import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mainApi from '../utils/MainApi';

// модули
import AuthAndRegister from './AuthAndRegister';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { MOVIES } from '../utils/constants/constants';
import { EMAIL_PATTERT } from '../utils/constants/constants';

// ошибки
import { UNAUTHORIZED_ERROR } from '../errors/UnauthorizedError';
import { UNHANDLE_ERROR } from '../errors/UnhandleError';
import { ERROR_MESSAGES } from '../utils/constants/constants';

function Login({ setErrorMessage, setLoggedIn, setLoading, errorMessage }) {

  const navigate = useNavigate();

  async function login({ email, password }) {
    setLoading(true);
    try {
      const res = await mainApi.login(email, password)
      setLoading(false);
      console.log(res, "Это res из login в App.jsx")
      localStorage.setItem('token', res.token);
      setLoggedIn(true);
      navigate(MOVIES, { replace: true });
    } catch (err) {
      let errorMessage;
      if (UNAUTHORIZED_ERROR) {
        errorMessage = ERROR_MESSAGES.WRONG_EMAIL_OR_PASSWORD;
      } else if (UNHANDLE_ERROR) {
        errorMessage = ERROR_MESSAGES.ERROR_SERVER;
      } else {
        errorMessage = ERROR_MESSAGES.ERROR_SIGNIN;
      }
      setLoading(false);
      setErrorMessage(errorMessage);
      console.log(`Ошибка в App, loginUser: ${err}`);
    }
  }

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: '',
    password: '',
  });

  // подтверждение
  function handleSubmit(evt) {
    evt.preventDefault();
    login(values);
  }

  return (
    <AuthAndRegister
      authAndRegisterHeading={'Рады видеть'}
      onSubmit={handleSubmit}
      isValid={isValid}
      errorMessage={errorMessage}
      authAndRegisterImputs={
        <>
          <fieldset className='authAndRegisterImputs__fieldset'>
            <label htmlFor='email' className='authAndRegisterImputs__label'>
              E-mail
            </label>
            <input
              id='email'
              name='email'
              pattern={EMAIL_PATTERT}
              type='email'
              className={errors.email ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              placeholder='Ваш e-mail'
              value={values?.email || ''}
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
              value={values?.password || ''}
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