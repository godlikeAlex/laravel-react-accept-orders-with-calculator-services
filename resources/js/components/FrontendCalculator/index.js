import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../Calculator/Calculator';

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
        <>
            <Calculator onUpdate={data => setCalculatedData(data)} />
            <hr />
            <h4>Total price: ${data?.total}</h4>
            <a class="theme_button color1" onClick={addToCart}>Add to cart</a>
        </>
    )
};

export default FrontendCalculator;

if (document.getElementById('react-frontend-calculator')) {
    ReactDOM.render(<FrontendCalculator />, document.getElementById('react-frontend-calculator'));
}