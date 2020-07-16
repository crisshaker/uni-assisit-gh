import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <ul className="nav">
      <li>
        <NavLink to="/dashboard/admissions">Open Admissions</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/applications">My Applications</NavLink>
      </li>
    </ul>
  );
}

export default Nav;
