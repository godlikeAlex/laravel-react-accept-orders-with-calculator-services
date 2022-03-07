import React, { useContext, useEffect, useState } from 'react';
import { MIN_PRICE } from '../../../components/Calculator/Calculator';
import { calculatePrice } from '../../../components/Calculator/utils';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, setServiceTotalTo, setTotalTo, updatePrices, updateQuantity } from '../../redux/cartSlice';
import HeadSection from '../HeadSection';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

const Cart = () => {
    const { services, total, prices, delivery, additional } = useSelector(state => state.cart);
    const { isAuth, user } = useSelector(state => state.auth);
    const [success, setSuceess] = useState(false);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const [nameOfSaved, setNameOfSaved] = useState('');
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const total = services.reduce((acum, service) => {
            const servicePrice = calculatePrice(service);
            return acum + servicePrice.total;
        }, 0);
        dispatch(setServiceTotalTo(total));
    }, [services]);

    useEffect(() => {
        const total = Object.keys(prices).reduce((total, item) => {
            return total + prices[item];
        }, 0);
        dispatch(setTotalTo(total));
    }, [prices]);

    const addToSaved = () => {
        setShowSavedModal(false);
        axios.post(`/api/wish/store`, { details: { services, total, prices }, name: nameOfSaved }, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => {
            if (data.ok) {
                setSuceess(true);
            }
        })
    }

    const deleteFromCart = index => {
        dispatch(removeFromCart(index));
        if (services.length - 1 === 0) {
            dispatch(clearCart());
            localStorage.removeItem('shoping-cart');
        }
    }

    const EmptyCart = () => (
        <section style={{ marginTop: 120, marginBottom: 120 }}>
            <h1 style={{ textAlign: 'center' }}>
                <ion-icon name="cart-outline" style={{ fontSize: 80 }}></ion-icon> <br />
                Empty Cart
            </h1>
        </section>
    );

    const TableCart = ({ items }) => (
        <div>
            <h2>Shopping cart</h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {items.map((item, index) => (
                    <li key={index} style={{ borderTop: '1px solid #e8e8e8', padding: '50px 15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 'normal', margin: 0 }}>{item.currentService.label}</h3>
                            <span style={{ color: 'black', fontWeight: 'bold' }}>{item.price.toLocaleString()} $</span>
                        </div>
                        <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase', marginTop: 15 }}>Width: {item.width};  Height: {item.height};</div>
                        <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {item.ftHeight.title};</div>
                        <div style={{ marginTop: '15px' }}>
                            <div className="quantity" style={{ marginRight: 15 }}>
                                <input type="button" value="-" className="minus" style={{ bottom: '12px' }} onClick={() => dispatch(updateQuantity({ type: 'minus', index }))} />
                                <i className="fa fa-angle-down" aria-hidden="true" style={{ bottom: '12px' }}></i>
                                <input type="number" style={{ height: '50px' }} step="1" readOnly min="0" value={item.quantity} name="product_quantity" title="Qty" className="form-control" />
                                <input type="button" value="+" className="plus" style={{ top: '12px' }} onClick={() => dispatch(updateQuantity({ type: 'plus', index }))} /> <i className="fa fa-angle-up" style={{ top: '12px' }} aria-hidden="true"></i>
                            </div>
                            <a className="remove fontsize_16" title="Remove this item" style={{ cursor: 'pointer' }} onClick={(e) => deleteFromCart(index)}>
                                <span className="fontsize_16">Delete</span> <i className="fa fa-trash-o" ></i>
                            </a>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <>
            {success && (
                <SweetAlert
                    success
                    title="Success"
                    timeout={2000}
                    confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                    confirmBtnStyle={{ boxShadow: 'unset' }}
                    onConfirm={() => {
                        setSuceess(false);
                    }}
                >
                    Added to saved
                </SweetAlert>
            )}

            {showSavedModal && (
                <SweetAlert
                    title={"Select the name of your save"}
                    onConfirm={() => { addToSaved() }}
                    onCancel={() => { setShowSavedModal(false) }}
                    confirmBtnText={"Add to saved"}
                    confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                    confirmBtnStyle={{ boxShadow: 'unset' }}
                    dependencies={[nameOfSaved]}
                >
                    {(renderProps) => (
                        <form>
                            <hr />
                            <input
                                type={'text'}
                                ref={renderProps.setAutoFocusInputRef}
                                className="form-control"
                                value={nameOfSaved}
                                onKeyDown={renderProps.onEnterKeyDownConfirm}
                                onChange={(e) => setNameOfSaved(e.target.value)}
                                placeholder={'Name of saved'}
                            />
                        </form>
                    )}
                </SweetAlert>
            )}
            <HeadSection title="Cart" image={'cart'} />
            {services.length <= 0 ? <EmptyCart /> : (
                <section className="ls section_padding_top_150 section_padding_bottom_150 columns_padding_30">
                    <div className="container">
                        <div className="row">
                            {/* <!-- <div className="col-xs-12 col-md-8 col-lg-8 col-md-push-4 col-lg-push-4"> --> */}
                            <div className="col-sm-8">
                                <TableCart {...{ items: services }} />
                            </div>

                            <div className="col-sm-4">
                                <div className="card-check-out center" style={{ border: '1px solid #e8e8e8', padding: '20px' }}>
                                    {prices.installation > 0 && (
                                        <p style={{ color: 'black' }}>Instalation price: <strong>$ {prices.installation.toFixed(2).toLocaleString()}</strong></p>
                                    )}

                                    {prices.removal > 0 && (
                                        <p style={{ color: 'black' }}>Removal price: <strong>$ {prices.removal.toFixed(2).toLocaleString()}</strong></p>
                                    )}

                                    {prices.survey > 0 && (
                                        <p style={{ color: 'black' }}>Site survey: <strong>$ {prices.survey.toFixed(2).toLocaleString()}</strong></p>
                                    )}

                                    {prices.urgencyInstsllstion > 0 && (
                                        <p style={{ color: 'black' }}>Urgency installation: <strong>$ {prices.urgencyInstsllstion.toFixed(2).toLocaleString()}</strong></p>
                                    )}

                                    <p style={{ color: 'black' }}>Tax (8.75%): <strong>$ {(total * 0.0875).toFixed(2).toLocaleString()}</strong></p>
                                    <p style={{ color: 'black' }}>Subtotal ({services.length} items): <strong>$ {(total * 1.0875).toFixed(2).toLocaleString()}</strong></p>
                                    
                                    {delivery && (
                                        <p style={{ color: 'black' }}>Material pickup: <strong>We will contact with for pricing</strong></p>
                                    )}
                                    
                                    {user ? (
                                        <a className="theme_button bg_button color1 min_width_button" to="/cart/check-out" onClick={() => setShowSavedModal(true)} style={{ width: '100%', paddingTop: 15, paddingBottom: 15 }}>Save for later</a>
                                    ) : (
                                        <Link className="theme_button bg_button color1 min_width_button" to="/cabinet/login" style={{ width: '100%', paddingTop: 15, paddingBottom: 15 }}>Save for later</Link>
                                    )}
                                    <Link className="theme_button bg_button color1 min_width_button" to="/cart/check-out" style={{ width: '100%', paddingTop: 15, paddingBottom: 15 }}>Order now</Link>
                                </div>


                                <div className="card-check-out center" style={{ marginTop: 25, border: '1px solid #e8e8e8', padding: '20px', }}>
                                    <div className="form-group">
                                        <h4>Additional services</h4>
                                    </div>
                                    <div
                                        className="form-group"
                                    >
                                        <input
                                            type="checkbox"
                                            onClick={() => additional.installation ? true : dispatch(updatePrices({ type: 'installation' }))}
                                            checked={prices.installation > 0}
                                        />
                                        <label style={{ marginLeft: 15 }} onClick={() => additional.installation ? true : dispatch(updatePrices({ type: 'installation' }))}>Installation</label>
                                    </div>

                                    <div
                                        className="form-group"
                                    >
                                        <input
                                            type="checkbox"
                                            onClick={() => additional.removal ? true : dispatch(updatePrices({ type: 'removal' }))}
                                            checked={prices.removal > 0}
                                        />
                                        <label style={{ marginLeft: 15 }} onClick={() => additional.removal ? true : dispatch(updatePrices({ type: 'removal' }))}>Removal</label>
                                    </div>


                                    <div
                                        className="form-group"
                                    >
                                        <input
                                            type="checkbox"
                                            onClick={() => dispatch(updatePrices({ type: 'delivery' }))}
                                            checked={delivery}
                                        />
                                        <label style={{ marginLeft: 15 }} onClick={() => dispatch(updatePrices({ type: 'delivery' }))}>Material pickup/delivery</label>
                                    </div>

                                    <div
                                        className="form-group"
                                    >
                                        <input
                                            type="checkbox"
                                            onClick={() => dispatch(updatePrices({ type: 'survey' }))}
                                            checked={prices.survey > 0}
                                        />
                                        <label style={{ marginLeft: 15 }} onClick={() => dispatch(updatePrices({ type: 'survey' }))}>Survey</label>
                                    </div>

                                    <div
                                        className="form-group"
                                    >
                                        <input
                                            type="checkbox"
                                            onClick={() => dispatch(updatePrices({ type: 'urgencyInstsllstion' }))}
                                            checked={prices.urgencyInstsllstion > 0}
                                        />
                                        <label style={{ marginLeft: 15 }} onClick={() => dispatch(updatePrices({ type: 'urgencyInstsllstion' }))}>Urgency Installation ⚡</label>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Cart;
