import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Check if the user is authenticated (has a valid token)
const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken'); // Replace with your token storage method
  // Implement your token validation logic here (e.g., verify signature, check expiration)
  return token ? true : false;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
