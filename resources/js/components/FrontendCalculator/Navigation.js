import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { calculatePrice } from '../Calculator/utils';
import { generateTemplate, MIN_PRICE } from '../Calculator/Calculator';

function Navigation({goBackCallBack, addToCartCallBack, formik}) {
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
        installation,
        removal,
        // delivery
      } = data;

      const service = {
        currentService,
        currentServiceType,
        ftHeight,
        height,
        price,
        quantity,
        totalPerItem,
        totalPerSqFt,
        width,
      }
      
      if (shopingCart) {
          let parsedShopingCart = JSON.parse(shopingCart);


          parsedShopingCart.services = [
              ...parsedShopingCart.services,
              service
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
          parsedShopingCart.delivery = false;

          localStorage.setItem('shoping-cart', JSON.stringify(parsedShopingCart));

          return false;
      }

      localStorage.setItem('shoping-cart', JSON.stringify({
        services: [service],
        prices,
        delivery: false,
        additional: {
          installation,
          removal,
        },
        total: data.total,
        totalServices: price,
      }));
 
    });
  }
  
  return (
    <>      
      <div style={{position: 'absolute', bottom: 0, justifyContent: 'space-between', display: 'flex', width: '100%', flexWrap: 'wrap'}}>
      {location.pathname !== '/' && (
        <button onClick={backHandler} className='theme_button bg_button color1 btn-calc'>
            BACK
        </button>
      )}

      {location.pathname == '/select-material' && (
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
              formik.resetForm();
              setShowAddedToCart(false);
              history.push('/');
          }}
          onCancel={() => {
            setShowAddedToCart(false);
            formik.resetForm();
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