import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { login } from './redux/actions';
import useGoogleLogin from './hooks/useGoogleLogin';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import ProfileEditPage from './pages/ProfileEditPage/index';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App({ user, login }) {
  useGoogleLogin(login);

  if (user === null) return <Loading />;

  return (
    <BrowserRouter>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/profile/edit" exact component={ProfileEditPage} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps, { login })(App);
