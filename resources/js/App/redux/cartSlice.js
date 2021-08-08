import { createSlice } from '@reduxjs/toolkit'
import { MIN_PRICE } from '../../components/Calculator/Calculator';
import { calculatePrice } from '../../components/Calculator/utils';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        services: [],
        total: 0,
        totalServices: 0,
        prices: {
            installation: MIN_PRICE,
            removal: 0,
            survey: 0,
            urgencyInstsllstion: 0,
        },
        loading: true
    },
    reducers: {
        initCart: (state, { payload }) => {
            state.services = payload.services;
            state.totalServices = payload.totalServices;
            state.prices = payload.prices;
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
                    return serviceToUpdate;
                }

                return service;
            });
        },
        updatePrices: (state, { payload }) => {
            const { totalServices, prices } = state;
            switch (payload.type) {
                case 'installation':
                    state.prices.installation = state.prices.installation > 0 ? 0 : totalServices;
                    break;
                case 'removal':
                    state.prices.removal = state.prices.removal > 0 ? 0 : totalServices * 0.5;
                    break;
                case 'survey':
                    state.prices.survey = state.prices.survey > 0 ? 0 : 250;
                    break;
                case 'urgencyInstsllstion':
                    state.prices.urgencyInstsllstion = state.prices.urgencyInstsllstion > 0 ? 0 : totalServices * 0.20;
                    break;
            }
        },
        setTotalTo: (state, { payload }) => {
            state.total = payload < MIN_PRICE ? MIN_PRICE : payload;
        },
        setServiceTotalTo: (state, { payload }) => {
            state.totalServices = payload;
        },
        clearCart: (state) => {
            state.services = [];
            state.total = 0;
        }
    },
})

export const { removeFromCart, setServiceTotalTo, setTotalTo, initCart, updateQuantity, clearCart, updatePrices } = cartSlice.actions

export default cartSlice.reducer