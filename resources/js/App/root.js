import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import loadable from '@loadable/component'

const App = loadable(() => import('./components/App'));
const stripePromise = loadStripe(process.env.MIX_STRIPE_KEY);

console.log(process.env.MIX_STRIPE_KEY);

function Root() {
    return (
        <Elements stripe={stripePromise}>
            <Provider {...{ store }}>
                <App />
            </Provider>
        </Elements>
    );
}

export default Root;