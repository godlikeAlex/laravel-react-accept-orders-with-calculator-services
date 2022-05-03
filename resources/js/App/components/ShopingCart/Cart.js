import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    clearCart, 
    removeFromCart, 
    updateCartPrice, 
    toggleAditional, 
    updateQuantity, 
    togglerPrices,
    setDelivery 
} from '../../redux/cartSlice';
import HeadSection from '../HeadSection';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

import './style.css';
import { MIN_PRICE } from '../../../components/Calculator/Calculator';

const Cart = () => {
    const { services, total, additional, delivery } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const [success, setSuceess] = useState(false);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const [nameOfSaved, setNameOfSaved] = useState('');
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    useEffect(() => {
        dispatch(updateCartPrice());
    }, [services, additional]);

    const addToSaved = () => {
        setShowSavedModal(false);
        axios.post(`/api/wish/store`, { details: { services, additional, total }, name: nameOfSaved }, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(({ data }) => {
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
                        <div className="content-justify">
                            <h3 className='cart-item-title'>{item.currentService.label}</h3>
                            <span className="cart-item-price">{item.total.toLocaleString()} $</span>
                        </div>
                        <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase', marginTop: 15 }}>Width: {item.width};  Height: {item.height}; Total Per Item: $ {item.totalPerItem};</div>
                        <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {item.ftHeight.title} - $ {item.ftHeight.price};</div>
                        
                        <div className="display-flex" style={{ marginTop: '15px'}}>
                            <div
                                className="display-flex v-center"
                            >
                                <input
                                    type="checkbox"
                                    style={{marginTop: '0px'}}
                                    onChange={() => dispatch(togglerPrices({type: 'installation', index}))}
                                    checked={item.prices.installation}
                                />
                                <label style={{ marginLeft: 5, fontSize: '14px', marginBottom: '0px'}} onClick={() => dispatch(togglerPrices({type: 'installation', index}))}>Installation</label>
                            </div>

                            <div
                                className="display-flex v-center"
                                style={{ marginLeft: '25px'}}
                            >
                                <input
                                    type="checkbox"
                                    onChange={() => dispatch(togglerPrices({type: 'removal', index}))}
                                    style={{marginTop: '0px'}}
                                    checked={item.prices.removal}
                                />
                                <label style={{ marginLeft: 5, fontSize: '14px', marginBottom: '0px'}} onClick={() => dispatch(togglerPrices({type: 'removal', index}))}>Removal</label>
                            </div>
                        </div>

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
                            <div className="col-sm-8">
                                <TableCart {...{ items: services }} />
                            </div>

                            <div className="col-sm-4">
                                <div className="card-check-out center" style={{ border: '1px solid #e8e8e8', padding: '20px' }}>
                                    
                                    {additional.survey > 0 && (
                                        <p className='color-black'>Site survey: <strong>$ {additional.survey.toFixed(2).toLocaleString()}</strong></p>
                                    )}

                                    {additional.urgencyInstsllstion > 0 && (
                                        <p className='color-black'>Urgency installation: <strong>$ {additional.urgencyInstsllstion.toFixed(2).toLocaleString()}</strong></p>
                                    )}

                                    <p className='color-black'>Services ({services.length} items): <strong>$ {(total).toFixed(2).toLocaleString()}</strong></p>

                                    <p className='color-black'>Tax (8.75%): <strong>$ {(total * 0.0875).toFixed(2).toLocaleString()}</strong></p>
                                    <p className='color-black'>Subtotal ({services.length} items): <strong>$ {(total * 1.0875).toFixed(2).toLocaleString()}</strong></p>
                                    
                                    {total <= MIN_PRICE && (
                                        <p className='color-black' style={{fontSize: '13px', color: '#c6c6c6'}}>Minimal price for order: 250$</p>
                                    )}

                                    {delivery && (
                                        <p className='color-black'>Material pickup: <strong>We will contact you with pricing</strong></p>
                                    )}
                                    
                                    {user ? (
                                        <a className="theme_button bg_button color1 min_width_button" to="/cart/check-out" onClick={() => setShowSavedModal(true)} style={{ width: '100%', paddingTop: 15, paddingBottom: 15, backgroundColor: 'black' }}>Save for later</a>
                                    ) : (
                                        <Link className="theme_button bg_button color1 min_width_button" to="/cabinet/login" style={{ width: '100%', paddingTop: 15, paddingBottom: 15, backgroundColor: 'black' }}>Save for later</Link>
                                    )}
                                    <Link className="theme_button bg_button color1 min_width_button" to="/cart/check-out" style={{ width: '100%', paddingTop: 15, paddingBottom: 15 }}>Order now</Link>
                                </div>


                                <div className="card-check-out center" style={{ marginTop: 25, border: '1px solid #e8e8e8', padding: '20px', }}>
                                    <div className="form-group">
                                        <h4>Additional services</h4>
                                    </div>

                                    <div
                                        className="additional-service-group"
                                    >
                                        <input
                                            type="checkbox"
                                            onChange={() => dispatch(setDelivery(!delivery))}
                                            checked={delivery}
                                        />
                                        <label onClick={() => dispatch(setDelivery(!delivery))}>Material pickup/delivery</label>
                                    </div>

                                    <div
                                        className="additional-service-group"
                                    >
                                        <input
                                            type="checkbox"
                                            onChange={() => dispatch(toggleAditional('survey'))}
                                            checked={additional.survey > 0}
                                        />
                                        <label onClick={() => dispatch(toggleAditional('survey'))}>Survey</label>
                                    </div>

                                    <div
                                        className="additional-service-group"
                                    >
                                        <input
                                            type="checkbox"
                                            onChange={() => dispatch(toggleAditional('urgencyInstsllstion'))}
                                            checked={additional.urgencyInstsllstion > 0}
                                        />
                                        <label onClick={() => dispatch(toggleAditional('urgencyInstsllstion'))}>Urgency Installation ⚡</label>
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
