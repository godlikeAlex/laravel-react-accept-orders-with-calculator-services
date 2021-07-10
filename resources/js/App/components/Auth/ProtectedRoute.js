import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function ProtectedRoute({ component: Component, ...params }) {
    const { isAuth, user, loading } = useSelector(state => state.auth);

    if (loading) {
        return <LoadingSpinner />
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