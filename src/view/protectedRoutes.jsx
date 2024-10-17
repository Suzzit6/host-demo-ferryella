import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/authContext';
const ProtectedRoute = ({ allowedRoles }) => {
    const {userAuth} = useUser();
    useEffect(() => {
        console.log("ProtectedRoute", userAuth);
    }, [userAuth]);

    if (userAuth && allowedRoles && !allowedRoles.includes(userAuth?.role)) {
        // User doesn't have the required role
        return <Navigate to="/unauthorized" replace />;
      }
  return <Outlet />;
};

export default ProtectedRoute;