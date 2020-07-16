import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { login } from './redux/actions';
import useGoogleLogin from './hooks/useGoogleLogin';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdmissionsPage from './pages/Dashboard/AdmissionsPage';
import ApplicationsPage from './pages/Dashboard/ApplicationsPage';
import ApplicationPage from './pages/Dashboard/ApplicationPage';

function App({ user, login }) {
  useGoogleLogin(login);

  if (user === null) return <Loading />;

  return (
    <BrowserRouter>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/profile/edit" exact component={ProfileEditPage} />
      <ProtectedRoute path="/dashboard/admissions" component={AdmissionsPage} />
      <ProtectedRoute
        path="/dashboard/applications"
        component={ApplicationsPage}
      />
      <ProtectedRoute path="/admissions/:id" component={ApplicationPage} />
    </BrowserRouter>
  );
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps, { login })(App);
