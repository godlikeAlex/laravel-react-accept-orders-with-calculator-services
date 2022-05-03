import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { calculatePrice } from '../Calculator/utils';
import { generateTemplate, MIN_PRICE } from '../Calculator/Calculator';
import {countAllCart, countService} from '../../common/cart';

function Navigation({goBackCallBack, addToCartCallBack, resetCalculator}) {
  const history = useHistory();
  const location = useLocation();
  const [showAddedToCart, setShowAddedToCart] = React.useState(false);

  const backHandler = () => goBackCallBack(() => history.goBack());

  const addToCartHandler = () => {
    addToCartCallBack((data) => {
      setShowAddedToCart(true);
      const shopingCart = localStorage.getItem('shoping-cart');

      const {
        currentService,
        currentServiceType,
        ftHeight,
        height,
        price,
        quantity,
        totalPerItem,
        totalPerSqFt,
        width,
        prices,
      } = data;

      const service = countService({
        currentService,
        currentServiceType,
        ftHeight,
        height: Number(height),
        width: Number(width),
        price: Number(price),
        quantity: Number(quantity),
        totalPerItem,
        totalPerSqFt,
        prices
      });

           
      if (shopingCart) {
          let parsedShopingCart = JSON.parse(shopingCart);


          parsedShopingCart.services = [
              ...parsedShopingCart.services,
              service
          ];

          const countedCart = countAllCart(parsedShopingCart);
          

          localStorage.setItem('shoping-cart', JSON.stringify(countedCart));

          return false;
      }

      const countedCart = countAllCart({
        services: [service],
        additional: {survey: 0, urgencyInstsllstion: 0},
        total: data.total,
      });

      localStorage.setItem('shoping-cart', JSON.stringify(countedCart));
 
    });
  }
  
  return (
    <>      
      <div style={{position: 'absolute', bottom: 0, justifyContent: location.pathname == '/' ? 'flex-end' : 'space-between', display: 'flex', width: '100%', flexWrap: 'wrap'}}>
      {location.pathname !== '/' && (
        <button onClick={backHandler} className='theme_button bg_button color1 btn-calc' style={{backgroundColor: 'black', color: 'white'}}>
            BACK
        </button>
      )}

      {location.pathname != '/form-tab' && (
        <a href="#contact" className='theme_button bg_button color1 btn-calc'>
          Other
        </a>
      )}

      {location.pathname == '/form-tab' && (
        <button onClick={addToCartHandler} className='theme_button bg_button color1 btn-calc'>
          Add to cart
        </button>
      )}

    </div>

    {showAddedToCart && (
      <SweetAlert
          success
          showCancel
          title="Add another item to cart?"
          confirmBtnText={'Yes, add one more'}
          cancelBtnText={'Go to cart'}
          confirmBtnCssClass={"theme_button bg_button color1 min_width_button custom-btn"}
          cancelBtnCssClass={"theme_button bg_button color1 min_width_button custom-btn"}
          confirmBtnStyle={{ boxShadow: 'unset', padding: '15px ​20px' }}
          cancelBtnStyle={{ boxShadow: 'unset', padding: '15px ​20px' }}
          onConfirm={() => {
              // resetCalculator();
              setShowAddedToCart(false);
              history.push('/');
          }}
          onCancel={() => {
            setShowAddedToCart(false);
            // resetCalculator();
            window.location.href = "/cart";
          }}
      >
          Your order added to cart.
      </SweetAlert>
    )}
    </>
  )
}

export default Navigation;