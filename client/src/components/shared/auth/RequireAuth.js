import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/auth/AuthContext';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If the user is not logged in, redirect to /sign-in and preserve location
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
