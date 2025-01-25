import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        // If the user is not logged in, redirect to login page
        return <Navigate to="/login" />;
    }

    if (loggedInUser.role !== roleRequired) {
        // If the logged-in user does not have the required role, show access denied
        return <Navigate to="/notFound" />;
    }

    // If user is logged in and has the correct role, render the protected component
    return children;
};

export default ProtectedRoute;
