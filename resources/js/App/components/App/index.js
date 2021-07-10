import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { initCart } from '../../redux/cartSlice';
import { initAuth, setAuthLoading } from '../Auth/authSlice';
import Routing from '../Routing';

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const shopingCartFromStorage = localStorage.getItem('shoping-cart');
        const token = localStorage.getItem('token');

        if (token) {
            axios({
                method: 'GET',
                url: '/api/me',
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(({ data }) => {
                dispatch(initAuth({ user: data }));
            }).catch(() => {
                dispatch(setAuthLoading(false));
            });
        } else {
            dispatch(setAuthLoading(false));
        }

        if (shopingCartFromStorage) {
            try {
                const cart = JSON.parse(shopingCartFromStorage);
                if (typeof cart === 'object' && cart !== null) {
                    if (cart.hasOwnProperty('services') && cart.hasOwnProperty('total')) {
                        dispatch(initCart(cart));
                    }
                }
            } catch (error) {
                console.log('Error', error);
            }
        }
    }, []);

    return (
        <Routing />
    );
}

export default App;