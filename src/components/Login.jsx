// --- база
import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mainApi from '../utils/MainApi';

// --- модули
import AuthAndRegister from './AuthAndRegister';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { MOVIES, EMAIL_PATTERT, PLACEHOLDERS, LABELS_FOR_FORMS } from '../utils/constants/constants';

// --- ошибки
import { ERROR_MESSAGES } from '../utils/constants/constants';

function Login({ setLoggedIn, setLoading, errorMessage, setErrorMessage }) {

  // -- юзы
  const navigate = useNavigate();

  function handleErrors(err) {
    switch (err) {
      case 'Ошибка: 401':
        setErrorMessage(ERROR_MESSAGES.WRONG_EMAIL_OR_PASSWORD)
        break;
      case 'Ошибка: 500':
        setErrorMessage(ERROR_MESSAGES.ERROR_SIGNIN)
        break;
      case 'Ошибка: 429':
        setErrorMessage(ERROR_MESSAGES.TO_MANY_QUERYS)
        break;
      default:
        setErrorMessage(ERROR_MESSAGES.ERROR_SERVER)
        console.log(err)
    }
  }

  async function login({ email, password }) {
    setLoading(true);
    try {
      const res = await mainApi.login(email, password)
      setLoading(false);
      localStorage.setItem('token', res.token);
      setLoggedIn(true);
      navigate(MOVIES, { replace: true });
    } catch (err) {
      handleErrors(err);
    } finally {
      setLoading(false);
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
              {LABELS_FOR_FORMS.EMAIL_LABEL}
            </label>
            <input
              id='email'
              name='email'
              pattern={EMAIL_PATTERT}
              type='email'
              className={errors.email ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              placeholder={PLACEHOLDERS.EMAIL}
              value={values?.email || ''}
              onChange={handleChange}
              required
            />
            <span className='authAndRegisterImputs__errorMessage'>{errors.email}</span>
          </fieldset>
          <fieldset className='authAndRegisterImputs__fieldset authAndRegisterImputs__fieldset_margin'>
            <label htmlFor='password' className='authAndRegisterImputs__label'>
              {LABELS_FOR_FORMS.PASSWORD_LABEL}
            </label>
            <input
              id='password'
              name='password'
              type='password'
              className={errors.password ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              value={values?.password || ''}
              onChange={handleChange}
              placeholder={PLACEHOLDERS.PASSWORD_LOG}
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