// src/Nav.tsx
import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import { StyledNavLink, UI } from './styles';
const Nav: React.FC = () => {
  return (
    <nav>
      <UI >
      <li>  <StyledNavLink to="/" end>
            Home
          </StyledNavLink></li>
    <li><NavLink to='/login'>Login</NavLink></li>
    <li>
      <NavLink 
        to='/my' 
        style={({ isActive }) => (isActive ? { color: 'red' } : {})}
      >
        My
      </NavLink>
    </li>
    <li><NavLink to='/items'>Items</NavLink></li>
    <li><NavLink to='/hello'>About</NavLink></li>
      </UI>
    </nav>
  );
}

export default Nav;
