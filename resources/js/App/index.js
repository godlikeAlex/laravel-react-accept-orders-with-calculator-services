import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const token = "pk_test_51JAtkbFjRSGcEV2oi1h9MyFh3NqseceLKcQfKcfe9tHc3jHuzRO9hJxDG3nt5fwriodR2EZqazKxuKfEkcAW205700RzCRW48t"
const stripePromise = loadStripe(token);
console.log(token);
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
    console.log('doesnt work')
    ReactDOM.render(<Root />, document.getElementById('app-react'));
}