import React, { useContext, useEffect, useState } from 'react';
import { MIN_PRICE } from '../../../components/Calculator/Calculator';
import { calculatePrice } from '../../../components/Calculator/utils';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setTotalTo, updateQuantity } from '../../redux/cartSlice';
import HeadSection from '../HeadSection';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';

const Cart = () => {
    const { services, total } = useSelector(state => state.cart);
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

        dispatch(setTotalTo(total));
    }, [services]);

    const addToSaved = () => {
        setShowSavedModal(false);
        axios.post(`/api/wish/store`, { details: { services, total }, name: nameOfSaved }, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => {
            if (data.ok) {
                setSuceess(true);
            }
        })
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
            <h2>Shoping cart</h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {items.map((item, index) => (
                    <li style={{ borderTop: '1px solid #e8e8e8', padding: '50px 15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: 'normal', margin: 0 }}>{item.currentService.label}</h3>
                            <span style={{ color: 'black', fontWeight: 'bold' }}>{item.price} $</span>
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
                            <a className="remove fontsize_16" title="Remove this item" style={{ cursor: 'pointer' }}>
                                <span className="fontsize_16">Delete</span> <i className="fa fa-trash-o" onClick={(e) => dispatch(removeFromCart(index))}></i>
                            </a>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )

    // const TableCart = ({ items }) => (
    //     <div className="table-responsive">
    //         <table className="table shop_table cart cart-table">
    //             <thead>
    //                 <tr>
    //                     <td className="product-info">Service</td>
    //                     <td className="product-quantity">Quantity</td>
    //                     <td className="product-subtotal">Subtotal</td>
    //                     <td className="product-remove">&nbsp;</td>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {items.map((item, index) => (
    //                     <tr className="cart_item" key={`${index}-${item.currentService.label}`}>
    //                         <td className="product-info">
    //                             <div className="media">
    //                                 <div className="media-body">
    //                                     <h4 className="media-heading">
    //                                         {item.currentService.label}
    //                                     </h4>
    //                                     <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Width: {item.width};</div>
    //                                     <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Height: {item.height};</div>
    //                                     <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {item.ftHeight.title};</div>
    //                                 </div>
    //                             </div>
    //                         </td>
    //                         <td className="product-quantity">
    //                             <div className="quantity">
    //                                 <input type="button" value="-" className="minus" onClick={() => dispatch(updateQuantity({ type: 'minus', index }))} />
    //                                 <i className="fa fa-angle-down" aria-hidden="true"></i>
    //                                 <input type="number" step="1" readOnly min="0" value={item.quantity} name="product_quantity" title="Qty" className="form-control" />
    //                                 <input type="button" value="+" className="plus" onClick={() => dispatch(updateQuantity({ type: 'plus', index }))} /> <i className="fa fa-angle-up" aria-hidden="true"></i>
    //                             </div>
    //                         </td>
    //                         <td className="product-subtotal"> <span className="currencies">$</span><span className="amount">{item.price}</span> </td>
    //                         <td className="product-remove"> <a className="remove fontsize_20" title="Remove this item">
    //                             <i className="fa fa-trash-o" onClick={(e) => dispatch(removeFromCart(index))}></i>
    //                         </a> </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // )

    return (
        <>
            {success && (
                <SweetAlert
                    success
                    title="Success"
                    timeout={2000}
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
            <HeadSection title="Cart" image={3} />
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
                                    <p style={{ color: 'black' }}>Sub total ({services.length} items): <strong>$ {total.toLocaleString()}</strong></p>

                                    {user && (
                                        <a className="theme_button bg_button color1 min_width_button" to="/cart/check-out" onClick={() => setShowSavedModal(true)} style={{ width: '100%', paddingTop: 15, paddingBottom: 15 }}>Saved for later</a>
                                    )}
                                    <Link className="theme_button bg_button color1 min_width_button" to="/cart/check-out" style={{ width: '100%', paddingTop: 15, paddingBottom: 15 }}>Order now</Link>
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