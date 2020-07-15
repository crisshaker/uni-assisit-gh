import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import history from '../history';
import server from '../apis/server';

function requireProfile(Component) {
  function Inner(props) {
    const [hasProfile, setHasProfile] = useState(null);

    useEffect(() => {
      (async () => {
        try {
          const response = await server.get('/query/user/has-profile');
          setHasProfile(response.data.result);
        } catch (err) {
          history.push('/');
        }
      })();
    }, []);

    if (hasProfile === null) return <Loading />;
    if (hasProfile === false)
      return <Redirect to={{ pathname: '/profile/edit' }} />;

    return <Component {...props} />;
  }

  return Inner;
}

export default requireProfile;
