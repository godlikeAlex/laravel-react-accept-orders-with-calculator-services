import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Auth/LoadingSpinner';
import DatePicker from "react-datepicker";
import SweetAlert from 'react-bootstrap-sweetalert';
import InputMask from 'react-input-mask';
import { addDays, format } from 'date-fns';

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
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalRechudle, setShowModalRechudle] = useState(false);
    const [showModalChangeOrder, setShowModalChangeOrder] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [updateNotes, setUpdateNotes] = useState('');
    const [date, setDate] = useState('');
    const [success, setSuceess] = useState(false);

    React.useEffect(() => {
        axios.get(`/api/user/orders/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(({ data }) => {
            if (data.ok) {
                setOrder(data.order);
                setDate(new Date(data.order.date));
                setLoading(false);
            } else {
                history.push('/cabinet/dashboard');
            }
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

    const sendRequest = async (type, message) => {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('order_id', id);
        formData.append('message', message);
        const { data } = await axios.post('/api/order/request', formData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (data.ok) {
            if (type === 'cancel') {
                setShowModalCancel(false);
                setSuceess(true);
            } else if (type === 'reschedule') {
                setShowModalRechudle(false);
                setSuceess(true);
            } else if (type === 'update') {
                setShowModalChangeOrder(false);
                setSuceess(true);
            }
        }

    }

    const orderDetails = () => {
        return (
            <table class="table margin_0">
                <tbody>
                    {JSON.parse(order.details).services.map(service => (
                        order.custom === 0 ? (
                            <tr>
                                <th class="grey medium">
                                    {service.currentService.label} X {service.quantity}
                                    <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Width: {service.width};</div>
                                    <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Height: {service.height};</div>
                                    <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {service.ftHeight.title};</div>
                                </th>
                                <td> <span>${+service.total.toFixed(2)}</span> </td>
                            </tr>
                        ) : (
                            <tr>
                                <th class="grey medium">
                                    {service.name}
                                </th>
                                <td> <span>${service.price}</span> </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        )
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="container">
            {success && (
                <SweetAlert
                    success
                    title="Success"
                    timeout={2000}
                    onConfirm={() => {
                        setSuceess(false);
                    }}
                    confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                    confirmBtnStyle={{ boxShadow: 'unset' }}
                >
                    Your request has been sent
                </SweetAlert>
            )}

            {showModalCancel && (
                <SweetAlert
                    title={"Send request to cancel order"}
                    onConfirm={() => sendRequest('cancel', cancelReason)}
                    onCancel={() => { setShowModalCancel(false) }}
                    confirmBtnText={"Send request"}
                    confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                    confirmBtnStyle={{ boxShadow: 'unset' }}
                    dependencies={[cancelReason]}
                >
                    {(renderProps) => (
                        <form>
                            <hr />
                            <input
                                type={'text'}
                                className="form-control"
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder={'Reason to cancel order'}
                            />
                        </form>
                    )}
                </SweetAlert>
            )}

            {showModalRechudle && (
                <SweetAlert
                    style={{ overflow: 'unset' }}
                    title={"Send request to reschedule order"}
                    showConfirm={false}
                    onCancel={() => { setShowModalRechudle(false) }}
                    dependencies={[date]}
                >
                    {(renderProps) => (
                        <form>
                            <hr />
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                minDate={addDays(new Date(order.date), 2)}
                                timeFormat="HH:mm"
                                dateFormat="dd/MM/yyyy HH:mm"
                                customInput={
                                    <InputMask
                                        className="form-control"
                                        mask="99/99/9999 99:99"
                                    />
                                }
                            />
                            <hr />
                            <a className="theme_button bg_button color1 min_width_button" onClick={() => sendRequest('reschedule', date)}>
                                Send request to reschedule
                            </a>
                        </form>
                    )}
                </SweetAlert>
            )}

            {showModalChangeOrder && (
                <SweetAlert
                    title={"Send request to change order"}
                    onConfirm={() => sendRequest('update', updateNotes)}
                    onCancel={() => { setShowModalChangeOrder(false) }}
                    confirmBtnText={"Send request"}
                    confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                    confirmBtnStyle={{ boxShadow: 'unset' }}
                    dependencies={[updateNotes]}
                >
                    {(renderProps) => (
                        <form>
                            <hr />
                            <textarea
                                type={'text'}
                                className="form-control"
                                value={updateNotes}
                                onChange={(e) => setUpdateNotes(e.target.value)}
                                placeholder={'Changes'}
                            ></textarea>
                        </form>
                    )}
                </SweetAlert>
            )}
            <div className="row" style={{ justifyContent: 'center', display: 'flex' }}>
                <div className="col-md-8" style={{ marginTop: 30, boxShadow: 'rgb(99 99 99 / 20%) 0px 2px 8px 0px' }}>
                    {order && (
                        <>
                            <div className="col-md-12">
                                <h2 style={{ textAlign: 'center' }}>ORDER ID: {order.id}</h2>
                                {orderDetails()}
                                <h3>Actions</h3>
                                <a class="theme_button color1" onClick={() => setShowModalCancel(true)}>Request to cancel order</a>
                                <a class="theme_button color1" onClick={() => setShowModalRechudle(true)}>Change schedule</a>
                                <a class="theme_button color1" onClick={() => setShowModalChangeOrder(true)}>Update order</a>
                                <h3>Details</h3>

                                <h6 style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>Tax (8.75%): <span style={{ textTransform: 'capitalize' }}>$ {(order.amount * 0.0875).toLocaleString()}</span> </h6>
                                <h6 style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>Amount: <span style={{ textTransform: 'capitalize' }}>$ {(order.amount).toLocaleString()}</span> </h6>
                                <h6 style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>Order status: <span style={{ textTransform: 'capitalize' }}>{order.status}</span> </h6>
                            </div>
                            {order.custom !== 1 && (
                                !showPayment ? (
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
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowOrder;