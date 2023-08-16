// --- база
import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mainApi from '../utils/MainApi';

// --- модули
import AuthAndRegister from './AuthAndRegister';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { ERROR_MESSAGES, MOVIES, EMAIL_PATTERT, PLACEHOLDERS, LABELS_FOR_FORMS } from '../utils/constants/constants';

function Register({ setLoading, setLoggedIn, errorMessage, setErrorMessage }) {

  // -- юзы
  const navigate = useNavigate();

  function handleErrors(err) {
    switch (err) {
      case 'Ошибка: 409':
        setErrorMessage(ERROR_MESSAGES.EMAIL_IS_EXISTS_ALREADY)
        break;
      case 'Ошибка: 500':
        setErrorMessage(ERROR_MESSAGES.ERROR_SIGNUP)
        break;
      case 'Ошибка: 429':
        setErrorMessage(ERROR_MESSAGES.TO_MANY_QUERYS)
        break;
      default:
        setErrorMessage(ERROR_MESSAGES.ERROR_SERVER)
        console.log(err)
    }
  }

  function handleAutoLogin({ email, password }) {
    mainApi.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate(MOVIES)
        }
      }).catch((err) => {
        handleErrors(err)
      })
  }


  async function register({ name, email, password }) {
    setLoading(true);
    try {
      const res = await mainApi.register(name, email, password)
      if (res) {
        handleAutoLogin({ email, password })
      }
    } catch (err) {
      handleErrors(err);
    } finally {
      setLoading(false);
    }
  }

  const { values, handleChange, errors, isValid } = useFormAndValidation({
    email: '',
    password: '',
    name: '',
  });

  // подтверждение
  function handleSubmit(evt) {
    evt.preventDefault();
    register(values);
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
              {LABELS_FOR_FORMS.NAME_LABEL}
            </label>
            <input
              id='name'
              name='name'
              type='name'
              minLength='2'
              maxLength='40'
              className={errors.name ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              placeholder={PLACEHOLDERS.NAME}
              value={values?.name || ''}
              onChange={handleChange}
              required
            />
            <span className='authAndRegisterImputs__errorMessage'>{errors.name}</span>
          </fieldset>
          <fieldset className='authAndRegisterImputs__fieldset'>
            <label htmlFor='email' className='authAndRegisterImputs__label'>
              {LABELS_FOR_FORMS.EMAIL_LABEL}
            </label>
            <input
              id='email'
              name='email'
              type='email'
              pattern={EMAIL_PATTERT}
              className={errors.email ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              placeholder={PLACEHOLDERS.EMAIL}
              value={values?.email || ''}
              onChange={handleChange}
              required
            />
            <span className='authAndRegisterImputs__errorMessage'>{errors.email}</span>
          </fieldset>
          <fieldset className='authAndRegisterImputs__fieldset'>
            <label htmlFor='password' className='authAndRegisterImputs__label'>
              {LABELS_FOR_FORMS.PASSWORD_LABEL}
            </label>
            <input
              id='password'
              name='password'
              type='password'
              className={errors.password ? 'authAndRegisterImputs__input authAndRegisterImputs__input_error' : 'authAndRegisterImputs__input'}
              placeholder={PLACEHOLDERS.PASSWORD_REG}
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