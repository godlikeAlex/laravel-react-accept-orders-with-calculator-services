import { createSlice } from '@reduxjs/toolkit'
import { MIN_PRICE } from '../../components/Calculator/Calculator';
import { calculatePrice } from '../../components/Calculator/utils';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        services: [],
        total: 0,
        loading: true
    },
    reducers: {
        initCart: (state, { payload }) => {
            state.services = payload.services;
            state.total = payload.total;
            state.loading = false;
        },
        removeFromCart: (state, { payload: index }) => {
            state.services = state.services.filter((_, idx) => idx !== index);
        },
        updateQuantity: (state, { payload }) => {
            const { type, index } = payload;
            state.services = state.services.map((service, idx) => {
                if (idx === index) {
                    const serviceToUpdate = { ...service };
                    switch (type) {
                        case 'plus':
                            serviceToUpdate.quantity = +serviceToUpdate.quantity + 1;
                            break;
                        case 'minus':
                            serviceToUpdate.quantity = serviceToUpdate.quantity === 1 ? 1 : +serviceToUpdate.quantity - 1;
                            break;
                    }

                    // wtf?
                    const calculatedPrice = calculatePrice(serviceToUpdate);
                    serviceToUpdate.price = calculatedPrice.total <= MIN_PRICE ? MIN_PRICE : calculatedPrice.total;
                    console.log(calculatedPrice);
                    return serviceToUpdate;
                }

                return service;
            });
        },
        setTotalTo: (state, { payload }) => {
            state.total = payload;
        },
        clearCart: (state) => {
            state.services = [];
            state.total = 0;
        }
    },
})

export const { removeFromCart, setTotalTo, initCart, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer