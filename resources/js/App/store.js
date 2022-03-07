import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './redux/cartSlice';
import authReducer from './components/Auth/authSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    },
});

store.subscribe(() => {
    const cart = store.getState().cart;
    if (!cart.loading) {
        localStorage.setItem('shoping-cart', JSON.stringify(cart));
        if (cart.services.length == 0) {
            localStorage.removeItem('shoping-cart');
        } else {
            localStorage.setItem('shoping-cart', JSON.stringify(cart));
        }
    }
});

export default store;