import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Cart from './Cart';
import CheckOut from './CheckOut';
import CartContext from './CartContext';
import ScrollToTop from './ScrollToTop';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ShopingCart = () => {
    const [cart, setCart] = React.useState({
        services: [],
        total: 0
    })

    React.useEffect(() => {
        const shopingCartFromStorage = localStorage.getItem('shoping-cart');
        if (shopingCartFromStorage) {
            try {
                setCart(JSON.parse(shopingCartFromStorage));
            } catch (error) {
                console.log('Error', error);
            }
        }
    }, []);

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

if (document.getElementById('shoping-cart')) {
    ReactDOM.render(<ShopingCart />, document.getElementById('shoping-cart'));
}

export default ShopingCart;