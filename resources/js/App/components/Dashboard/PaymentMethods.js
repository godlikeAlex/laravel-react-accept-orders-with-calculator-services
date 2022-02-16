import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import usePaymentMethods from './usePaymentMethods';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactLoading from 'react-loading';
import { useMediaQuery } from 'react-responsive';

export const IconsPaymentMethods = {
    'amex': 'fa fa-cc-amex',
    'diners': 'fa fa-cc-diners-club',
    'discover': 'fa fa-cc-discover',
    'jcb': 'fa fa-cc-jcb',
    'mastercard': 'fa fa-cc-mastercard',
    'unionpay': 'fa fa-credit-card-alt',
    'visa': 'fa fa-cc-visa',
    'unknown': 'fa fa-credit-card'
};

function PaymentMethods() {
    const { token } = useSelector(state => state.auth);
    const [paymentMethods, isLoading, setPaymentMethods] = usePaymentMethods();
    const [disabled, setDisabled] = useState(false);
    const [success, setSuceess] = useState(false);
    const [editModal, showEditModal] = useState(false);
    const [editCardState, setEditCardState] = useState({
        exp_month: 0,
        exp_year: 0,
        paymentMethod: null,
    });
    const [editDisabledModal, setEditModalDisabled] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitStripe = async () => {
        setDisabled(true);

        if (!stripe || !elements) {
            setDisabled(false);
            return;
        }


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
            setDisabled(false);
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

    const startEditCard = (paymentMethod) => {
        setEditCardState({
            exp_month: paymentMethod.card.exp_month,
            exp_year: paymentMethod.card.exp_year,
            paymentMethod: paymentMethod.id
        });
        showEditModal(true);
    }

    const updatePaymentMethod = async () => {
        setEditModalDisabled(true);
        try {
            const { data } = await axios.post(`/api/user/payment-methods/${editCardState.paymentMethod}`, editCardState, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (data.ok) {
                axios.get('/api/user/payment-methods', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(({ data }) => {
                    showEditModal(false);
                    setSuceess(true);
                    setEditModalDisabled(false);
                    setPaymentMethods(data.data);
                });
            }

        } catch (error) {
            console.log(error);
            showEditModal(false);
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
                        <li key={paymentMethod.id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', fontSize: isMobile ? '14px' : '18px', backgroundColor: '#f2f2f2', padding: '10px 20px', borderBottom: '1px solid #e4e4e4' }}>
                            <div>
                                <span>
                                    {Object.keys(IconsPaymentMethods).includes(paymentMethod.card.brand) ? (
                                        <i className={IconsPaymentMethods[paymentMethod.card.brand]} aria-hidden="true"></i>
                                    ) : (<i className={IconsPaymentMethods.unknown} aria-hidden="true"></i>)}
                                </span>
                                <span style={{ marginLeft: 25 }}>**** ***** **** {paymentMethod.card.last4}</span>
                            </div>
                            <div>
                                <span>
                                    {paymentMethod.card.exp_month <= 9 ? `0${paymentMethod.card.exp_month}` : paymentMethod.card.exp_month}/{paymentMethod.card.exp_year}
                                </span>
                                {!isMobile && (
                                    <>
                                        <a style={{ paddingLeft: '30px', cursor: 'pointer', fontSize: 15 }} onClick={() => startEditCard(paymentMethod)}>
                                            <i className="rt-icon2-pencil" ></i>
                                        </a>
                                        <a style={{ paddingLeft: '15px', cursor: 'pointer', fontSize: 15 }} onClick={() => deletePayment(paymentMethod.id)} >
                                            <i className="rt-icon2-trash-o" ></i>
                                        </a>
                                    </>
                                )}
                            </div>
                            {isMobile && (
                                <div style={{ marginLeft: 'auto' }}>
                                    <a style={{ paddingLeft: '30px', cursor: 'pointer', fontSize: 15 }} onClick={() => startEditCard(paymentMethod)}>
                                        <i className="rt-icon2-pencil" ></i>
                                    </a>
                                    <a style={{ paddingLeft: '15px', cursor: 'pointer', fontSize: 15 }} onClick={() => deletePayment(paymentMethod.id)} >
                                        <i className="rt-icon2-trash-o" ></i>
                                    </a>
                                </div>
                            )}
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

            {editModal && (
                <SweetAlert
                    title="Edit card"
                    openAnim={false}
                    closeAnim={false}
                    onCancel={() => showEditModal(false)}
                    onConfirm={() => {
                        updatePaymentMethod();
                    }}
                    confirmBtnText={"Save Card"}
                    confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                    confirmBtnStyle={{ boxShadow: 'unset' }}
                    disabled={editDisabledModal}
                    dependencies={[editCardState, editDisabledModal]}
                >
                    <div className="row" style={{ textAlign: 'left' }}>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label >Expiry month</label>
                                <select
                                    class="form-control"
                                    id="exampleFormControlSelect1"
                                    value={editCardState.exp_month}
                                    disabled={editDisabledModal}
                                    onChange={e => setEditCardState({ ...editCardState, exp_month: e.target.value })}
                                >
                                    <option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label >Expiry year</label>
                                <select
                                    class="form-control"
                                    id="exampleFormControlSelect1"
                                    value={editCardState.exp_year}
                                    disabled={editDisabledModal}
                                    onChange={e => setEditCardState({ ...editCardState, exp_year: e.target.value })}
                                >
                                    <option value="2021">2021</option><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option><option value="2029">2029</option><option value="2030">2030</option><option value="2031">2031</option><option value="2032">2032</option><option value="2033">2033</option><option value="2034">2034</option><option value="2035">2035</option><option value="2036">2036</option><option value="2037">2037</option><option value="2038">2038</option><option value="2039">2039</option><option value="2040">2040</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </SweetAlert>
            )}
        </>
    )
}

export default PaymentMethods;