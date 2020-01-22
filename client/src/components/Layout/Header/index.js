import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

const Header = (props) => {
  return (
    <header>
      <div className="container">
        <nav>
          <ul className="menu-left">
            <li className="item">
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>

          <ul className="menu-right">
            <li className="item">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="item">
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;