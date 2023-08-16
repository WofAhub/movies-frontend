// --- база
import React from "react";
import { NavLink } from 'react-router-dom';

// -- модули
import Header from "./Header";

function NavTab() {
  return (
    <Header
      headerNavTab={
        <nav className='navTab'>
          <NavLink to='/sign-up' className={({ isActive }) => `navTab__reg navTab_item button button_hover ${isActive ? 'navTab_active' : ''}`}>Регистрация</NavLink>
          <NavLink to='/sign-in' className={({ isActive }) => `navTab__login navTab_item button button_authAndReg ${isActive ? 'navTab_active' : ''}`}>Войти</NavLink>
        </nav>
      }
    />
  )
}

export default NavTab;