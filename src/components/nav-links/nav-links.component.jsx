import React from "react";
import { NavLink } from "react-router-dom";
import './nav-links.styles.scss';

export const NavLinks = (props) => {
  return (
    <ul className="navbar-nav mr-auto">
      {props.pages.map((value, index) => (
        <li key={index} className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName={props.active ? "disabled" : null}
            to={value.url}
          >
            {value.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
