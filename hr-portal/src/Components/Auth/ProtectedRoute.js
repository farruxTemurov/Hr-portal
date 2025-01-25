import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roleRequired }) => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        // Redirect to login if the user is not logged in
        return <Navigate to="/login" replace />;
    }

    if (user.role !== roleRequired) {
        // Redirect to login or a 404 page if the user does not have the required role
        return <Navigate to="/notFound" replace />;
    }

    // Render the component if the user is authenticated and authorized
    return element;
};

export default ProtectedRoute;
