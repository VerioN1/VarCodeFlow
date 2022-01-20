import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './NavButton.css';

interface NavButtonProps {
  to: string;
  text: string;
  isAuthrized?: boolean;
  colorMode: string;
}

const NavButton : FC<NavButtonProps> = ({
  text, to, isAuthrized = true, colorMode,
}) => {
  if (isAuthrized)
    return (
      <NavLink
        className={({ isActive }) => (colorMode === 'dark'
          ? `nav-button-dark ${isActive ? 'active-dark' : ''}`
          : `nav-button-light ${isActive ? 'active-light' : ''}`)}
        to={`${to}`}
      >
        {text}
      </NavLink>
    );
  return null;
};

export default NavButton;
