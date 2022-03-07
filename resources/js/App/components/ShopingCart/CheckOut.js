import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useFormik } from 'formik';
import { Redirect, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import axios from 'axios';
import { clearCart, setTotalTo, updatePrices } from '../../redux/cartSlice';
import HeadSection from '../HeadSection';
import SelectPaymentMethod from './SelectPaymentMethod';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from 'date-fns';

function checkIfFilesAreCorrectType(files) {
    let valid = true
    if (files) {
        files.map(file => {
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                valid = false
            }
        })
    }
    return valid
}

export const OrderSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    terms: Yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
    imagesValidate: Yup.array().min(1, 'Images field must have at least 1 items')
        .required('Upload images')
        .test(
            'is-big-file',
            'Unsuported format file! Image required [png, jpg, jpeg]',
            checkIfFilesAreCorrectType
        ),
});

function CheckOut() {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState();
    const { services, total, prices, delivery } = useSelector(state => state.cart);
    const { user, isAuth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleSubmit, handleChange, values, errors, touched, setFieldError, setFieldValue } = useFormik({
        initialValues: {
            'name': isAuth ? user.name : '',
            'email': isAuth ? user.email : '',
            'phone': isAuth ? user.phone : '',
            'address': '',
            'date': addDays(Date.now(), prices.urgencyInstsllstion > 0 ? 0 : 2),
            'notes': '',
            'images': [],
            'imagesValidate': [],
            'terms': false,
        },
        validationSchema: OrderSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);

            const submitPayment = async (paymentMethod) => {
                const formData = new FormData();
                formData.append('cart', JSON.stringify({
                    services,
                    total,
                    prices,
                    delivery,
                    acceptedServices: {
                        installation: prices.installation > 0,
                        removal: prices.removal > 0,
                        survey: prices.survey > 0,
                        urgencyInstsllstion: prices.urgencyInstsllstion > 0,
                    },
                }));
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('phone', values.phone);
                formData.append('address', values.address);
                formData.append('date', (new Date(values.date)).toUTCString());
                formData.append('notes', values.notes);
                formData.append('payment_method_id', paymentMethod);

                if (values.images) {
                    Array.from(values.images).forEach(img => {
                        formData.append('images[]', img);
                    });
                }

                try {
                    const { data } = await axios({
                        method: 'POST',
                        url: '/api/purchase',
                        data: formData,
                        headers: {
                            // 'Content-type': 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'Authorization': isAuth && token ? `Bearer ${token}` : undefined
                        }
                    });
                    history.push('/cart/thank-you');
                    dispatch(clearCart());
                    localStorage.removeItem('shoping-cart');
                    setIsSubmitting(false);
                } catch (error) {
                    if (error.response.data.message) {
                        setFieldError('loginError', error.response.data.message);
                    }
                    setIsSubmitting(false);
                }
            }

            if (currentPaymentMethod?.value === 'new' || !isAuth) {
                if (!stripe || !elements) {
                    return;
                }

                const cardElement = elements.getElement(CardElement);

                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                });

                if (error) {
                    if (error.message) {
                        setFieldError('loginError', error.message);
                    }
                    setIsSubmitting(false);
                } else {
                    submitPayment(paymentMethod.id);
                }
            } else {
                submitPayment(currentPaymentMethod.value);
            }
        }
    });

    React.useEffect(() => {
        const total = Object.keys(prices).reduce((total, item) => {
            return total + prices[item];
        }, 0);
        dispatch(setTotalTo(total));
        setFieldValue('date', addDays(Date.now(), prices.urgencyInstsllstion > 0 ? 0 : 2));
    }, [prices]);

    // If cart is empty redirect to cart page.
    if (services.length <= 0) {
        return <Redirect to="/cart" />
    }

    return (
        <>
            <HeadSection title="Check out" image={'check-out'} />
            <section className="ls section_padding_top_150 section_padding_bottom_150 columns_padding_30">
                <div className="container">
                    <div className="row">
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div className="col-md-8">
                                <h2 className="topmargin_20">Billing Address</h2>
                                <form className="form-horizontal checkout shop-checkout" role="form">
                                    {!isAuth && (
                                        <div className="form-group validate-required" id="billing_last_name_field">
                                            <label className="col-sm-3 control-label">
                                                <span className="grey">Your name <span style={{color: "red"}}>*</span>:</span>
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
                                            <span className="grey">Phone number <span style={{color: "red"}}>*</span>:</span>
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
                                                <span className="grey">Email <span style={{color: "red"}}>*</span>:</span>
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
                                            <span className="grey">Job Site <span style={{color: "red"}}>*</span>:</span>
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
                                            <span className="grey">Select date <span style={{color: "red"}}>*</span>:</span>
                                        </label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                selected={values.date}
                                                showTimeSelect
                                                minDate={addDays(Date.now(), prices.urgencyInstsllstion > 0 ? 0 : 2)}
                                                onChange={(date) => setFieldValue('date', date)}
                                                timeFormat="HH:mm"
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                customInput={
                                                    <InputMask
                                                        className="form-control"
                                                        mask="99/99/9999 99:99"
                                                    />
                                                }
                                            />
                                            {errors.date && touched.date ? (
                                                <div className="error">{errors.date}</div>
                                            ) : null}

                                            <input
                                                type="checkbox"
                                                onClick={() => dispatch(updatePrices({ type: 'urgencyInstsllstion' }))}
                                                checked={prices.urgencyInstsllstion > 0}
                                            /> Urgent installation ⚡
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">
                                            <span className="grey">Card Number <span style={{color: "red"}}>*</span>:</span>
                                        </label>
                                        <div className="col-sm-9">
                                            {isAuth && (
                                                <SelectPaymentMethod {...{ currentPaymentMethod, setCurrentPaymentMethod }} />
                                            )}
                                            {!isAuth || currentPaymentMethod?.value === 'new' ? (
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
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">
                                            <span className="grey">Where to install? <span style={{color: "red"}}>*</span>:</span>
                                        </label>
                                        <div className="col-sm-9">
                                            <div class="inputfile">
                                                <input
                                                    type="file"
                                                    size="30"
                                                    name="file"
                                                    multiple
                                                    id="file"
                                                    onChange={e => {
                                                        setFieldValue('images', e.target.files);
                                                        let imgs = [];
                                                        for (const image of e.target.files) {
                                                            imgs.push({ type: image.type })
                                                        }
                                                        setFieldValue('imagesValidate', imgs);
                                                    }}
                                                />
                                                <label style={{ marginRight: '0px' }} for="file" class="theme_button bg_button color1"><span>Add Your File</span></label>
                                                {errors.imagesValidate && touched.imagesValidate ? (
                                                    <div className="error">{errors.imagesValidate}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col-md-4">
                                <aside className="col-md-12" style={{ position: 'sticky', top: '0px' }}>
                                    <h3 className="widget-title col-md-12" id="order_review_heading">Your order</h3>
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
                                                    <td>Tax (8.75%):</td>
                                                    <td> <span className="amount grey">
                                                        <strong>$ {(total * 0.0875).toLocaleString()}</strong>
                                                    </span> </td>
                                                </tr>
                                                <tr className="order-total">
                                                    <td>Total:</td>
                                                    <td> <span className="amount grey">
                                                        <strong>$ {(total * 1.0875).toLocaleString()}</strong>
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

                                            <input
                                                type="checkbox"
                                                onClick={() => setFieldValue('terms', !values.terms)}
                                                checked={values.terms}
                                            /> I agree to the <a href="/terms" target='_blank'>EasyWayInstall Terms</a>

                                            {errors.terms && touched.terms ? (
                                                <div className="error">{errors.terms}</div>
                                            ) : null}

                                            <div className="place-order topmargin_30">
                                                <button type="submit"
                                                    className="theme_button color1 min_width_button"
                                                    disabled={isSubmitting}
                                                    name="checkout_place_order"
                                                    id="place_order" disabled={isSubmitting || (isAuth && !currentPaymentMethod)}
                                                    onClick={handleSubmit}
                                                >Place orders</button>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};


export default CheckOut;
