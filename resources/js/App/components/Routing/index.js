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
import { Dashboard, ShowOrder, Saved, UpdateProfile } from '../Dashboard';
import NotFound from '../NotFound';

function Routing() {
    const { loading } = useSelector(state => state.auth);

    return (
        <Router>
            {loading && <LoadingSpinner />}
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
                    <ProtectedRoute exact path="/cabinet/dashboard/saved" component={Saved} />
                    <ProtectedRoute exact path="/cabinet/dashboard/update-profile" component={UpdateProfile} />
                    <Route component={NotFound} />
                </Switch>
            </ScrollToTop>
        </Router>
    );
};

export default Routing;