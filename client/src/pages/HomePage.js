import React from 'react';
import { connect } from 'react-redux';

import logo from '../assets/img/logo.svg';
import googleLogo from '../assets/img/google.svg';
import introImage from '../assets/img/home-intro-img.svg';
import mockup from '../assets/img/mockup.png';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { NavLink } from 'react-router-dom';

function renderHero(user) {
  return (
    <div className="hero">
      <div className="wrapper">
        <header className="t1">
          <h1 className="logo">
            <i className="fas fa-graduation-cap"></i>
            <img src={logo} alt="Logo" />
          </h1>
          <div className="right">
            {user && <NavLink to="/dashboard/admissions">My Dashboard</NavLink>}
            <GoogleAuthButton />
          </div>
        </header>

        <div className="content">
          <h2>
            <span>A new approach to Tertiary Applications</span>
          </h2>
          <p>- Tertiary Application simplified</p>
        </div>
      </div>
    </div>
  );
}

function renderIntro() {
  return (
    <div className="intro">
      <div className="wrapper">
        <img src={introImage} alt="Intro" />
        <div className="content">
          <h3>What is Uni Assist GH?</h3>
          <p>
            Uni Assist makes it dead simple to apply to almost all tertiary
            institutions in the country and keep track of your admission status.
            All that and many other useful features at no extra charge!
          </p>
          <p>
            It’s tertiary applications without the stress that comes with it.
          </p>
        </div>
      </div>
    </div>
  );
}

function renderConclusion(user) {
  function onSignInClick() {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  return (
    <div className="conclusion">
      <div className="wrapper">
        <img src={mockup} className="mockup" alt="Site Mockup" />
        <div className="content">
          <h3>Ready? Let's get started</h3>
          {user ? (
            <NavLink to="/dashboard/admissions">
              Start applying <i className="fas fa-arrow-right"></i>
            </NavLink>
          ) : (
            <button onClick={onSignInClick}>
              <img src={googleLogo} alt="" />
              <span>Log in with Google</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function HomePage({ user }) {
  return (
    <div id="home">
      {renderHero(user)}
      {renderIntro()}
      {renderConclusion(user)}
      <div style={{ height: 200 }} />
    </div>
  );
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps)(HomePage);
