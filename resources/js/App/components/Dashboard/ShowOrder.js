import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Auth/LoadingSpinner';

function ShowOrder() {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();
    const token = localStorage.getItem('token');
    const [disabled, setDisabled] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [showPayment, setShowPayment] = useState(false);

    React.useEffect(() => {
        axios.get(`/api/user/orders/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(({ data }) => {
            setOrder(data.order);
            setLoading(false);
        })
    }, []);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            setDisabled(true);
            axios({
                method: 'POST',
                url: '/api/re-purchase',
                data: {
                    payment_method_id: paymentMethod.id,
                    order_id: order.id
                },
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(({ data }) => {
                history.push('/cabinet/dashboard');
                setDisabled(false);
            }).catch(e => {
                setDisabled(false);
                history.push('/cabinet/dashboard');
                console.log(e.response.data)
            })
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    if (loading) return <LoadingSpinner />

    return (
        <div className="container">
            <div className="row" style={{ justifyContent: 'center', display: 'flex' }}>
                <div className="col-md-8" style={{ marginTop: 30, boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px' }}>
                    {order && (
                        <>
                            <div className="col-md-12">
                                <h2 style={{ textAlign: 'center' }}>ORDER ID: {order.id}</h2>
                                <table class="table margin_0">
                                    <tbody>
                                        {JSON.parse(order.details).services.map(service => (
                                            <tr>
                                                <th class="grey medium">
                                                    {service.currentService.label} X {service.quantity}

                                                    <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Width: {service.width};</div>
                                                    <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Height: {service.height};</div>
                                                    <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {service.ftHeight.title};</div>
                                                </th>
                                                <td> <span>${service.price}</span> </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                                <h6 style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>Amount: <span style={{ textTransform: 'capitalize' }}>${order.amount}</span> </h6>
                                <h6 style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>Order status: <span style={{ textTransform: 'capitalize' }}>{order.status}</span> </h6>

                            </div>
                            {!showPayment ? (
                                <div class="col-md-12">
                                    <a onClick={() => setShowPayment(true)} style={{ width: '100%' }} class="theme_button bg_button color2 min_width_button">Reorder</a>
                                </div>
                            ) : (
                                <div class="col-md-12">
                                    <div style={{ padding: '11px 30px 13px', backgroundColor: '#f2f2f2' }}>
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
                                            disabled
                                        }}
                                        />
                                    </div>
                                    <button disabled={disabled} onClick={handleSubmit} style={{ width: '100%', marginTop: '10px' }} class="theme_button bg_button color2 min_width_button">Reorder</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowOrder;