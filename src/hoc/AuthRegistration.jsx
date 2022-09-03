import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AuthRegistration({ children }) {
  const { loggedIn } = useAuth();
  const location = useLocation();

  if (loggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
