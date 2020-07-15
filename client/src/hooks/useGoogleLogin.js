import { useRef, useEffect } from 'react';
import axios from 'axios';

function useGoogleLogin(login) {
  const auth = useRef(null);

  useEffect(() => {
    async function onAuthChange(isSignedIn) {
      if (isSignedIn) {
        const token = auth.current.currentUser.get().getAuthResponse().id_token;
        try {
          const response = await axios.post('/auth/login', { token });
          window.auth_token = response.data.token;
          login(response.data.token);
        } catch (err) {
          login(false);
        }
      } else {
        window.auth_token = undefined;
        login(false);
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
          auth.current = window.gapi.auth2.getAuthInstance();

          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        })
        .catch((err) => console.log(err));
    });
  }, []);
}

export default useGoogleLogin;
