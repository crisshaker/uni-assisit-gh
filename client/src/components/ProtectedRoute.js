import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
}

function mapStateToProps({ auth }) {
  return { user: auth.user };
}

export default connect(mapStateToProps)(ProtectedRoute);
