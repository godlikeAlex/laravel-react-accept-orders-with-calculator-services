import React, { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { calculatePrice } from '../Calculator/utils';

const Calculator = lazy(() => import('../Calculator/Calculator'))

const renderLoader = () => <p>Loading</p>;

function FrontendCalculator() {
    const [data, setCalculatedData] = useState(null);

    const addToCart = () => {
        const shopingCart = localStorage.getItem('shoping-cart');
        if (shopingCart) {
            let parsedShopingCart = JSON.parse(shopingCart);

            parsedShopingCart.services = [
                ...parsedShopingCart.services,
                ...data.services
            ];

            const totalServices = parsedShopingCart.services.reduce((total, service) => {
                const { total: currentPrice } = calculatePrice(service);
                return total + currentPrice;
            }, 0);

            parsedShopingCart.totalServices = totalServices;

            parsedShopingCart.prices = {
                ...parsedShopingCart.prices,
                removal: data.prices.removal > 0 ? totalServices * 0.5 : 0,
                installation: data.prices.installation > 0 ? totalServices : 0,
                urgencyInstsllstion: parsedShopingCart.prices.urgencyInstsllstion > 0 ? totalServices * 0.2 : 0
            }

            const total = Object.keys(parsedShopingCart.prices).reduce((total, item) => {
                return total + parsedShopingCart.prices[item];
            }, 0);

            parsedShopingCart.total = total;

            localStorage.setItem('shoping-cart', JSON.stringify(parsedShopingCart));
            window.location.href = "/cart";

            return;
        }
        localStorage.setItem('shoping-cart', JSON.stringify(data));
        window.location.href = "/cart";
    }

    return (
        <Suspense fallback={renderLoader()}>
            <Calculator
                onUpdate={data => setCalculatedData(data)}
                renderFooter
                onAddCart={addToCart}
                bottomAddMore
            />
        </Suspense>
    )
};

export default FrontendCalculator;

if (document.getElementById('react-frontend-calculator')) {
    ReactDOM.render(<FrontendCalculator />, document.getElementById('react-frontend-calculator'));
}