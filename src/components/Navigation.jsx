// --- база
import React from "react";
import { NavLink } from 'react-router-dom';

// -- модули
import Header from "./Header";
import useWindowDimensions from '../hooks/useWindowDemension'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

function Navigation() {

  // -- стейт бургер меню
  const [isBurgerMenuOpen, setBurgerMenuOpen] = React.useState(false);

  const isMobileWidth = useWindowDimensions() <= 898;
  const links = [
    {
      path: '/movies',
      label: "Фильмы",
    },
    {
      path: '/saved-movies',
      label: "Сохранённые фильмы",
    },
  ];

  function createNavLink(path, label) {
    return (
      <>
        <li key={label}>
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
              {links.map(({ path, label }) => createNavLink(path, label))}
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