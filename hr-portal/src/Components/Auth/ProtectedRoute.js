// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, roleRequired, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    // If no user is logged in or the user doesn't have the required role, redirect to login
    if (!user || user.role !== roleRequired) {
        return <Navigate to="/login" />;
    }

    // If the user has the required role, render the component
    return <Route {...rest} element={Component} />;
};

export default ProtectedRoute;
