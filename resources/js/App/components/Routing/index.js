import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Cart from '../ShopingCart/Cart';
import CheckOut from '../ShopingCart/CheckOut';
import ScrollToTop from './ScrollToTop';
import { Login, SignUp } from '../Auth';
import ProtectedRoute from '../Auth/ProtectedRoute';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../Auth/LoadingSpinner';
import Thanks from '../ShopingCart/Thanks';
import Header from '../Header/Header';
import { Dashboard, ShowOrder } from '../Dashboard';

function Routing() {
    const { loading } = useSelector(state => state.auth);

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <Router>
            <Header />
            <ScrollToTop>
                <Switch>
                    <Route exact path="/cart">
                        <Cart />
                    </Route>
                    <Route exact path="/cart/check-out">
                        <CheckOut />
                    </Route>
                    <Route exact path="/cart/thank-you">
                        <Thanks />
                    </Route>
                    <Route exact path="/cabinet/login">
                        <Login />
                    </Route>
                    <Route exact path="/cabinet/sign-up">
                        <SignUp />
                    </Route>
                    <ProtectedRoute exact path="/cabinet/dashboard" component={Dashboard} />
                    <ProtectedRoute exact path="/cabinet/dashboard/show/:id" component={ShowOrder} />
                </Switch>
            </ScrollToTop>
        </Router>
    );
};

export default Routing;