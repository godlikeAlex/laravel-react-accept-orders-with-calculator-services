import React, { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

const Calculator = lazy(() => import('../Calculator/Calculator'))

const renderLoader = () => <p>Loading</p>;

function FrontendCalculator() {
    const [data, setCalculatedData] = useState(null);

    const addToCart = () => {
        const shopingCart = localStorage.getItem('shoping-cart');
        if (shopingCart) {
            let parsedShopingCart = JSON.parse(shopingCart);
            parsedShopingCart.total += data.total;
            parsedShopingCart.services = [
                ...parsedShopingCart.services,
                ...data.services
            ];
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