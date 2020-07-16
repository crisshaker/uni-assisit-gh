import React from 'react';
import { connect } from 'react-redux';

import logo from '../assets/img/logo-black.svg';
import GoogleAuthButton from './GoogleAuthButton';

function Header({ user }) {
  return (
    <header className="t2">
      <div className="wrapper">
        <h1 className="logo">
          <i className="fas fa-graduation-cap"></i>
          <img src={logo} alt="Logo" />
        </h1>
        <div className="right">
          <GoogleAuthButton />
        </div>
      </div>
    </header>
  );
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps)(Header);
