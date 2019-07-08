import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../services/auth';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);
