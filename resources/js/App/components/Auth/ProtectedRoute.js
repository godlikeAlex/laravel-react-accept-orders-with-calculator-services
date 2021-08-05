import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function ProtectedRoute({ component: Component, ...params }) {
    const { isAuth, user, loading } = useSelector(state => state.auth);

    if (loading) {
        return <div style={{ position: 'absolute', width: '100vw', height: '100vh', backgroundColor: 'white', zIndex: 9999999, top: 0 }}>
            <div className="preloader_image"></div>
        </div>
    }

    return (
        isAuth && user ? (
            <Route
                {...params}
                render={props => <Component {...props} {...params} />}
            />
        ) : (
            <Redirect to="/cabinet/login" />
        )
    )
};

export default ProtectedRoute;