import React from 'react';
import { Link } from 'react-router-dom';

function AuthAndRegister({
  authAndRegisterHeading,
  authAndRegisterImputs,
  authAndRegisterBtnSubmit,
  registerOrLogin,
  onSubmit,
}) {
  return (
    <section className='authAndRegister'>
      <div className='authAndRegister__box'>
        <div className='authAndRegister__top'>
          <Link to='/' className='logo' alt='Логотип' />
          <h1 className='authAndRegister__heading'>{authAndRegisterHeading}</h1>
        </div>
        <form className='authAndRegister__form' onSubmit={onSubmit}>
          {authAndRegisterImputs}
          <button type='submit' className='authAndRegister__submit-btn button_authAndReg'>{authAndRegisterBtnSubmit}</button>
        </form>
        {registerOrLogin}
      </div>
    </section>
  );
}

export default AuthAndRegister;