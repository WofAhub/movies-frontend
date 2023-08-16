// --- база
import {React, useState} from "react";
import { NavLink } from 'react-router-dom';

// -- модули
import Header from "./Header";
import useWindowDimensions from '../hooks/useWindowDemension'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { navigationLinks } from "../utils/constants/constants";

function Navigation() {

  // -- стейт бургер меню
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  // -- юзы
  const isMobileWidth = useWindowDimensions() <= 898;

  function createNavLink(path, label, id) {
    return (
      <>
        <li key={id}>
          <NavLink className={({ isActive }) => `navigation__item button button_hover ${isActive ? 'navigation__item_active' : ''}`} to={path}>
            {label}
          </NavLink>
        </li>
      </>
    )
  }

  function createButtons() {
    return (
      <div onClick={() => setBurgerMenuOpen(!isBurgerMenuOpen)} className='button__burger'>
        {isBurgerMenuOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
    )
  }

  return (
    <>
      <Header
        headerNavigation={
          <nav className={isBurgerMenuOpen ? 'navigation navigation_active navigation_mediaScreen' : 'navigation navigation_mediaScreen'}>
            <ul className='navigation__box'>
              {isMobileWidth && createNavLink('/', 'Главная')}
              {navigationLinks.map(({ path, label, id }) => createNavLink(path, label, id))}
            </ul>
            <NavLink to='/profile' className={({ isActive }) => `navigation__account button button_header ${isActive ? 'navigation__account_active' : ''}`}>Аккаунт</NavLink>
          </nav>
        }
        burgerButton={
          isMobileWidth && createButtons()
        }
      />
      <div className={isBurgerMenuOpen ? 'navigation__overlay navigation__overlay_active' : 'navigation__overlay'} />
    </>
  )
}

export default Navigation;