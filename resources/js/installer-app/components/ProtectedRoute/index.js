import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { ROUTE_PREFIX } from '../App/App';

function ProtectedRoute({ component: Component, ...params }) {
    const { auth, user } = useSelector(state => state.auth);

    // if (loading) {
    //     return <div style={{ position: 'absolute', width: '100vw', height: '100vh', backgroundColor: 'white', zIndex: 9999999, top: 0 }}>
    //         <CircularProgress />
    //     </div>
    // }

    return (
        auth && user ? (
            <Route
                {...params}
                render={props => <Component {...props} />}
            />
        ) : (
            <Redirect to={`${ROUTE_PREFIX}/login`} />
        )
    )
};

export default ProtectedRoute;