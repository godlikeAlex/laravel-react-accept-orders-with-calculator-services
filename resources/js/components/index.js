import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Cart from '../App/components/ShopingCart/Cart';
import CheckOut from '../App/components/ShopingCart/CheckOut';
import CartContext from '../App/components/ShopingCart/CartContext';
import ScrollToTop from '../App/components/Routing/ScrollToTop';

const Root = () => {
    const [cart, setCart] = React.useState({
        services: [],
        total: 0
    })

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            <Router>
                <ScrollToTop>
                    <Switch>
                        <Route exact path="/cart">
                            <Cart />
                        </Route>
                        <Route exact path="/cart/check-out">
                            <Elements stripe={stripePromise}>
                                <CheckOut />
                            </Elements>
                        </Route>
                    </Switch>
                </ScrollToTop>
            </Router>
        </CartContext.Provider>
    );
};

if (document.getElementById('app-react')) {
    ReactDOM.render(<Root />, document.getElementById('app-react'));
}

export default Root;