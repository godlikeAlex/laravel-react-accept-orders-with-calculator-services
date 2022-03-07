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
        additional: {
            installation: false,
            removal: false
        },
        delivery: false,
        loading: true
    },
    reducers: {
        initCart: (state, { payload }) => {
            state.services = payload.services;
            state.totalServices = payload.totalServices;
            state.prices = payload.prices;
            state.delivery = payload.delivery;
            state.loading = false;
            state.additional = payload.additional || {installation: false, removal: false};
        },
        extendCart: (state, { payload }) => {
            const { services, totalServices, prices, total } = state;
            state.services = [
                ...services,
                ...payload.services
            ];
            state.totalServices = state.services.reduce((total, service) => {
                const { total: currentPrice } = calculatePrice(service);
                return total + currentPrice;
            }, 0);
            state.delivery = payload.delivery;
            let calculatedPrices = {};
            Object.keys(payload.prices).forEach(priceKey => {
                if (priceKey === 'installation') {
                    calculatedPrices.installation = payload.prices[priceKey] ? state.totalServices : 0;
                }

                if (priceKey === 'removal') {
                    calculatedPrices.removal = payload.prices[priceKey] ? state.totalServices * 0.5 : 0;
                }

                if (priceKey === 'survey') {
                    calculatedPrices.survey = payload.prices[priceKey] ? 250 : 0;
                }

                if (priceKey === 'urgencyInstsllstion') {
                    console.log(payload.prices[priceKey] > 0 ? total * 0.20 : 0);
                    calculatedPrices.urgencyInstsllstion = payload.prices[priceKey] > 0 ? total * 0.20 : 0;
                }
            });



            if (calculatedPrices.urgencyInstsllstion != 0) {
                const total = calculatedPrices.installation + calculatedPrices.removal + calculatedPrices.survey;

                calculatedPrices.urgencyInstsllstion = total * 0.20;
            }

            state.prices = calculatedPrices;

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
                    serviceToUpdate.price = calculatedPrice.total;
                    return serviceToUpdate;
                }

                return service;
            });
        },
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
        setServiceTotalTo: (state, { payload }) => {
            state.totalServices = payload;

            state.prices.installation = state.prices.installation != 0 && payload;
            state.prices.removal = state.prices.removal != 0 && payload * 0.5;

            if (state.prices.urgencyInstsllstion != 0) {
                const total = state.prices.installation + state.prices.removal + state.prices.survey;

                state.prices.urgencyInstsllstion = total * 0.20;
            }
        },
        clearCart: (state) => {
            state.services = [];
            state.total = 0;
            state.prices = {
                installation: MIN_PRICE,
                removal: 0,
                survey: 0,
                urgencyInstsllstion: 0,
            }
        }
    },
})

export const { removeFromCart, setServiceTotalTo, setTotalTo, extendCart, initCart, updateQuantity, clearCart, updatePrices } = cartSlice.actions

export default cartSlice.reducer