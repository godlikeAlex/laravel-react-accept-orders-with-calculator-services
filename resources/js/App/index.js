import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.MIX_STRIPE_KEY);
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

if (document.getElementById('app-react')) {
    ReactDOM.render(<Root />, document.getElementById('app-react'));
}