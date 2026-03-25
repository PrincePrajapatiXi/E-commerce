import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // While fetching auth state from backend /me route
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-transparent">
                <div className="animate-spin w-12 h-12 md:w-16 md:h-16 border-4 border-primary border-t-transparent rounded-full shadow-glow"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Pass the requested location in 'state', so we can redirect them back after login
        return <Navigate to="/account" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
