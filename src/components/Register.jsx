// база
import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mainApi from '../utils/MainApi';

// модули
import AuthAndRegister from './AuthAndRegister';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { SIGN_IN } from '../utils/constants/constants';

// ошибки
import { DUBLICATE_ERROR } from '../errors/DublicateError';
import { UNHANDLE_ERROR } from '../errors/UnhandleError';
import { ERROR_MESSAGES } from '../utils/constants/constants';

function Register({ setLoading, errorMessage, setErrorMessage }) {

  const navigate = useNavigate();

  async function register({ name, email, password }) {
    setLoading(true);
    try {
      const res = await mainApi.register(name, email, password)
      setLoading(false);
      setErrorMessage('');
      console.log(res, 'Это res из register в App.jsx')
      navigate(SIGN_IN, { replace: true });
    } catch (err) {
      let errorMessage;
      if (DUBLICATE_ERROR) {
        errorMessage = ERROR_MESSAGES.EMAIL_IS_EXISTS_ALREADY;
      } else if (UNHANDLE_ERROR) {
        errorMessage = ERROR_MESSAGES.ERROR_SERVER;
      } else {
        errorMessage = ERROR_MESSAGES.ERROR_SIGNUP;
      }
      setLoading(false);
      setErrorMessage(errorMessage);
      console.log(`Ошибка в регистрации, в App: ${err}`)
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