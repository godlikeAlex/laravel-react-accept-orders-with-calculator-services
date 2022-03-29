import { createSlice } from '@reduxjs/toolkit'
import { MIN_PRICE } from '../../components/Calculator/Calculator';
import { calculatePrice } from '../../components/Calculator/utils';
import {countAllCart, countService} from '../../common/cart';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        services: [],
        additional: {
            urgencyInstsllstion: 0,
            survey: 0
        },
        total: 0,
        delivery: false,
        loading: true
    },
    reducers: {
        initCart: (state, { payload }) => {
            const {services, additional, total} = countAllCart({
                services: payload.services,
                additional: payload.additional || {urgencyInstsllstion: 0, survey: 0},
                total: payload.total || 0
            });
            
            state.services = services;
            state.additional = additional;
            state.total = total;
            
            state.delivery = payload.delivery;
            state.loading = false;
        },

        updateCartPrice: (state) => {
            const {additional, total} = countAllCart({
                services: state.services,
                additional: state.additional,
                total: state.total
            });

            state.additional = additional;
            state.total = total < MIN_PRICE ? MIN_PRICE : total;
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

                    const calculatedPrice = countService(serviceToUpdate);
                    return calculatedPrice;
                }

                return service;
            });
        },

        toggleAditional: (state, { payload: additionalType }) => {
            const {urgencyInstsllstion, survey} = state.additional;
            
            switch (additionalType) {
                case 'urgencyInstsllstion':
                    const countTotalOfServices = state.services.reduce((total, service) => {
                        return total + service.total;
                    }, 0);
                    state.additional.urgencyInstsllstion = urgencyInstsllstion ? 0 : countTotalOfServices * 0.20;
                    break;
                case 'survey':
                    state.additional.survey = survey ? 0 : 250;
                    break;
            }
        },

        removeFromCart: (state, { payload: index }) => {
            state.services = state.services.filter((_, idx) => idx !== index);
        },

        clearCart: (state) => {
            state.services = [];
            state.total = 0;
            state.additional = {
                urgencyInstsllstion: 0,
                survey: 0
            };
        },

        setDelivery: (state, {payload}) => {
            state.delivery = payload;
        },

        togglerPrices: (state, {payload}) => {
            const { type, index } = payload;
            state.services = state.services.map((service, idx) => {
                if (idx === index) {
                    const serviceToUpdate = { ...service };
                    const {installation, removal} = serviceToUpdate.prices;
                    switch (type) {
                        case 'installation':
                            serviceToUpdate.prices.installation = installation ? 0 : serviceToUpdate.price;
                            break;
                        case 'removal':
                            serviceToUpdate.prices.removal = removal ? 0 : serviceToUpdate.price * 0.5;
                            break;
                    }

                    const calculatedPrice = countService(serviceToUpdate);
                    return calculatedPrice;
                }
                return service;
            });
        },

        extendCart: (state, { payload }) => {
            const { additional, total } = state;
            
            const counted = countAllCart({
                services: [
                    ...state.services,
                    ...payload.services
                ],
                additional: additional,
                total
            });

            state.services = counted.services;
            state.additional = counted.additional;
            state.total = counted.total;
            state.loading = false;
        },


        // asd

        updatePrices: (state, { payload }) => {
            const { totalServices, prices, total } = state;
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
                    state.prices.urgencyInstsllstion = state.prices.urgencyInstsllstion > 0 ? 0 : total * 0.20;
                    break;
                case 'delivery':
                    state.delivery = !state.delivery;
                    break;
            }

            if (state.prices.urgencyInstsllstion != 0) {
                const total = state.prices.installation + state.prices.removal + state.prices.survey;

                state.prices.urgencyInstsllstion = total * 0.20;
            }
        },
        setTotalTo: (state, { payload }) => {
            state.total = payload < MIN_PRICE ? MIN_PRICE : payload;
        },
    },
})

export const { removeFromCart, toggleAditional, extendCart, initCart, updateQuantity, clearCart, togglerPrices, updateCartPrice, setDelivery } = cartSlice.actions

export default cartSlice.reducer