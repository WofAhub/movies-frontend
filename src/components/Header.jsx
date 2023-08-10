import React from 'react';
import { Link } from 'react-router-dom';

function Header({
  headerNavigation,
  headerNavTab,
  burgerButton,
}) 

{
  return (
    <header className='header header_burger header_mediaScreen'>
      <div className='header__box'>
        <Link to='/' aria-label='Movies' className='logo' />
        {headerNavigation}
        {headerNavTab}
        {burgerButton}
      </div>
    </header>
  );
};

export default Header;