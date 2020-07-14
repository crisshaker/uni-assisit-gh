import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import googleLogo from '../assets/img/google.svg';

function GoogleAuthButton() {
  let auth = useRef(null).current;

  useEffect(() => {
    async function onAuthChange(isSignedIn) {
      if (isSignedIn) {
        const token = auth.currentUser.get().getAuthResponse().id_token;
        try {
          const response = await axios.post('/auth/login', { token });
          console.log(response.data.token);
        } catch (err) {
          console.log(err);
        }
      }
    }

    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '18048296876-22h5tf7jk6vbha5cbec0063e9qf86lfb.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  function onSignInClick() {
    // console.log(auth.currentUser.get().getAuthResponse().id_token);
    auth.signIn();
  }

  function onLogoutClick() {
    auth.signOut();
  }

  return (
    <button onClick={onSignInClick} onDoubleClick={onLogoutClick}>
      <img src={googleLogo} alt="" />
      <span>Log in with Google</span>
    </button>
  );
}

export default GoogleAuthButton;
