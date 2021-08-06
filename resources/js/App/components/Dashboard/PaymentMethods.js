import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import usePaymentMethods from './usePaymentMethods';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactLoading from 'react-loading';

function PaymentMethods() {
    const { token } = useSelector(state => state.auth);
    const [paymentMethods, isLoading, setPaymentMethods] = usePaymentMethods();
    const [disabled, setDisabled] = useState(false);
    const [success, setSuceess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitStripe = async () => {
        if (!stripe || !elements) {
            return;
        }

        setDisabled(true);

        const { data } = await axios.get('/api/user/card-wallet', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const cardElement = elements.getElement(CardElement);

        const result = await stripe.confirmCardSetup(data.client_secret, {
            payment_method: {
                card: cardElement,
            }
        });

        if (result.error) {
            console.log(result.error);
        } else {
            axios.get('/api/user/payment-methods', {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(({ data }) => {
                setSuceess(true);
                setDisabled(false);
                setPaymentMethods(data.data)
                cardElement.clear();
            });
        }
    };

    const deletePayment = id => {
        axios.get(`/api/user/payment-methods/delete/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(data => {
            setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
        });
    }

    const Loading = () => (
        <ul style={{ listStyle: 'none' }} className="col-md-7">
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ReactLoading color="black" type="spin" />
            </div>
            {new Array(3).fill(0).map((_, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 18, backgroundColor: '#f2f2f2', padding: '10px 20px', borderBottom: '1px solid #e4e4e4' }}>
                    <div>
                        <span>
                            <i className="fa fa-cc-visa" aria-hidden="true"></i>
                        </span>
                        <span style={{ marginLeft: 25 }}>**** ***** **** ****</span>
                    </div>
                </li>
            ))}
        </ul>
    )

    return (
        <>
            {isLoading ? <Loading /> : (
                <ul style={{ listStyle: 'none' }} className="col-md-7">
                    {paymentMethods.map((paymentMethod) => (
                        <li key={paymentMethod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 18, backgroundColor: '#f2f2f2', padding: '10px 20px', borderBottom: '1px solid #e4e4e4' }}>
                            <div>
                                <span>
                                    {paymentMethod.card.brand === 'visa' ? (
                                        <i className="fa fa-cc-visa" aria-hidden="true"></i>
                                    ) : (<i className="fa fa-cc-mastercard" aria-hidden="true"></i>)}
                                </span>
                                <span style={{ marginLeft: 25 }}>**** ***** **** {paymentMethod.card.last4}</span>
                            </div>
                            <a onClick={() => deletePayment(paymentMethod.id)}>
                                <i className="rt-icon2-trash-o" ></i>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
            <form action="" className="col-md-7">
                <div style={{ padding: '21px 40px 23px', backgroundColor: '#f2f2f2' }}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#222',
                                    backgroundColor: '#f2f2f2',
                                    fontFamily: 'Poppins, Open Sans, Segoe UI, sans-serif',
                                    padding: 20
                                },
                            },
                            disabled,
                            hidePostalCode: true,
                        }}
                    />
                </div>
            </form>
            <div className="col-md-12">
                <button disabled={disabled} type="submit" onClick={() => handleSubmitStripe()} className="theme_button bg_button color1 btn-calc" >ADD MORE PAYMENT METHOD</button>
            </div>
            {success && (
                <SweetAlert
                    success
                    title="Success"
                    timeout={2000}
                    onConfirm={() => {
                        setSuceess(false);
                    }}
                >
                    Payment method added successfully.
                </SweetAlert>
            )}
        </>
    )
}

export default PaymentMethods;