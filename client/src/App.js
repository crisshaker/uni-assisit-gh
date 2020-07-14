import React from 'react';
import logo from './assets/img/logo.svg';
import googleLogo from './assets/img/google.svg';
import introImage from './assets/img/home-intro-img.svg';
import mockup from './assets/img/mockup.png';
import GoogleAuthButton from './components/GoogleAuthButton';

function renderHero() {
  return (
    <div className="hero">
      <div className="wrapper">
        <header>
          <h1 className="logo">
            <i className="fas fa-graduation-cap"></i>
            <img src={logo} alt="Logo" />
          </h1>
          <GoogleAuthButton />
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

function renderConclusion() {
  return (
    <div className="conclusion">
      <div className="wrapper">
        <img src={mockup} className="mockup" alt="Site Mockup" />
        <div className="content">
          <h3>Ready? Let's get started</h3>
          <button>
            <img src={googleLogo} alt="" />
            <span>Log in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <div id="home">
        {renderHero()}
        {renderIntro()}
        {renderConclusion()}
      </div>

      <div style={{ height: 200 }} />
    </>
  );
}

export default App;
