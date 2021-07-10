import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useFormik } from 'formik';
import { Redirect, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';
import { clearCart } from '../../redux/cartSlice';
import HeadSection from '../HeadSection';

export const OrderSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
});

function CheckOut() {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const { services, total } = useSelector(state => state.cart);
    const { user, isAuth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const { handleSubmit, handleChange, values, errors, touched, isSubmitting, setFieldError } = useFormik({
        initialValues: {
            'name': isAuth ? user.name : '',
            'email': isAuth ? user.email : '',
            'phone': isAuth ? user.phone : '',
            'address': '',
            'notes': ''
        },
        validationSchema: OrderSchema,
        onSubmit: async (values, { setSubmitting }) => {
            if (!stripe || !elements) {
                return;
            }

            setSubmitting(true);

            const cardElement = elements.getElement(CardElement);

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.log('[error]', error);
            } else {
                try {
                    const { data } = await axios({
                        method: 'POST',
                        url: '/api/purchase',
                        data: {
                            ...values,
                            cart: JSON.stringify({ services, total }),
                            payment_method_id: paymentMethod.id,
                        },
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': isAuth && token ? `Bearer ${token}` : undefined
                        }
                    });
                    history.push('/cart/thank-you');
                    dispatch(clearCart());
                    localStorage.removeItem('shoping-cart');
                    setSubmitting(false);
                } catch (error) {
                    if (error.response.data.message) {
                        setFieldError('loginError', error.response.data.message);
                    }
                    setSubmitting(false);
                }
            }
        }
    });

    // If cart is empty redirect to cart page.

    if (services.length <= 0) {
        return <Redirect to="/cart" />
    }

    return (
        <>
            <HeadSection title="Check out" image={1} />
            <section className="ls section_padding_top_150 section_padding_bottom_150 columns_padding_30">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-8">
                            <h2 className="topmargin_20">Billing Address</h2>
                            <form className="form-horizontal checkout shop-checkout" role="form">
                                {!isAuth && (
                                    <div className="form-group validate-required" id="billing_last_name_field">
                                        <label className="col-sm-3 control-label">
                                            <span className="grey">Your name:</span>
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                disabled={isSubmitting}
                                                onChange={handleChange}
                                                value={values.name}
                                            />
                                            {errors.name && touched.name ? (
                                                <div className="error">{errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                )}
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Phone number:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <InputMask mask="(999) 999-9999" name="phone" value={values.phone} onChange={handleChange}>
                                            {(inputProps) => (
                                                <input
                                                    {...inputProps}
                                                    type="text"
                                                    className="form-control"
                                                />
                                            )}
                                        </InputMask>
                                        {errors.phone && touched.phone ? (
                                            <div className="error">{errors.phone}</div>
                                        ) : null}
                                    </div>
                                </div>
                                {!isAuth && (
                                    <div className="form-group validate-required" id="billing_last_name_field">
                                        <label className="col-sm-3 control-label">
                                            <span className="grey">Email:</span>
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                disabled={isSubmitting}
                                                onChange={handleChange}
                                                value={values.email}
                                            />
                                            {errors.email && touched.email ? (
                                                <div className="error">{errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                )}
                                <div className="form-group address-field validate-required" id="billing_address_fields">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Address:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control "
                                            name="address"
                                            disabled={isSubmitting}
                                            onChange={handleChange}
                                            value={values.address}
                                        />
                                        {errors.address && touched.address ? (
                                            <div className="error">{errors.address}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Order Notes:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="notes"
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            value={values.notes}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Card Number:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <div style={{ padding: '21px 40px 23px', backgroundColor: '#f2f2f2' }}>
                                            <CardElement lassName="card-element" options={{
                                                style: {
                                                    base: {
                                                        fontSize: '18px',
                                                        color: '#222',
                                                        backgroundColor: '#f2f2f2',
                                                        fontFamily: 'Poppins, Open Sans, Segoe UI, sans-serif',
                                                    }
                                                },
                                                hidePostalCode: true,
                                                disabled: isSubmitting
                                            }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <aside className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-0 col-lg-4">
                            <h3 className="widget-title" id="order_review_heading">Your order</h3>
                            <div id="order_review" className="shop-checkout-review-order">
                                <table className="table shop_table shop-checkout-review-order-table">
                                    <thead>
                                        <tr>
                                            <td className="product-name">Product</td>
                                            <td className="product-total">Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((item, index) => (
                                            <tr className="cart_item" key={`${index}-${item.currentService.label}-chckeout`}>
                                                <td className="product-name" >
                                                    {item.currentService.label}
                                                    <span className="product-quantity">× {item.quantity}</span>
                                                </td>
                                                <td className="product-total"> <span className="amount grey">${item.price.toLocaleString()}</span> </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="order-total">
                                            <td>Total:</td>
                                            <td> <span className="amount grey">
                                                <strong>${total.toLocaleString()}</strong>
                                            </span> </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div id="payment" className="shop-checkout-payment">
                                    <div className="col-sm-12">
                                        {errors.loginError && (
                                            <div className="error" role="alert">
                                                {errors.loginError}
                                            </div>
                                        )}
                                    </div>
                                    <div className="place-order topmargin_30" onClick={handleSubmit}> <button type="submit"
                                        className="theme_button color1 min_width_button" disabled={isSubmitting} name="checkout_place_order"
                                        id="place_order">Place orders</button> </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
};


export default CheckOut;