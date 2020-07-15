import React from 'react';
import { connect } from 'react-redux';
import googleLogo from '../assets/img/google.svg';

function GoogleAuthButton(props) {
  function onSignInClick() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  function onLogoutClick() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  if (props.user) {
    return (
      <button onClick={onLogoutClick}>
        <img src={googleLogo} alt="" />
        <span>Log Out</span>
      </button>
    );
  }

  return (
    <button onClick={onSignInClick}>
      <img src={googleLogo} alt="" />
      <span>Log in with Google</span>
    </button>
  );
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps)(GoogleAuthButton);
