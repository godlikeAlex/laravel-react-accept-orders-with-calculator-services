import React, { useContext, useEffect, useState } from 'react';
import { MIN_PRICE } from '../../../components/Calculator/Calculator';
import { calculatePrice } from '../../../components/Calculator/utils';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setTotalTo, updateQuantity } from '../../redux/cartSlice';
import HeadSection from '../HeadSection';

const Cart = () => {
    const { services, total } = useSelector(state => state.cart);
    const { isAuth, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    console.log(isAuth, user);

    useEffect(() => {
        const total = services.reduce((acum, service) => {
            const servicePrice = calculatePrice(service);
            return acum + servicePrice;
        }, 0);

        dispatch(setTotalTo(total));
    }, [services]);

    const EmptyCart = () => (
        <h1 style={{ textAlign: 'center' }}>Cart are empty!!!</h1>
    );

    const TableCart = ({ items }) => (
        <div className="table-responsive">
            <table className="table shop_table cart cart-table">
                <thead>
                    <tr>
                        <td className="product-info">Service</td>
                        <td className="product-quantity">Quantity</td>
                        <td className="product-subtotal">Subtotal</td>
                        <td className="product-remove">&nbsp;</td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr className="cart_item" key={`${index}-${item.currentService.label}`}>
                            <td className="product-info">
                                <div className="media">
                                    <div className="media-body">
                                        <h4 className="media-heading">
                                            {item.currentService.label}
                                        </h4>
                                        <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Width: {item.width};</div>
                                        <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Height: {item.height};</div>
                                        <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {item.ftHeight.title};</div>
                                    </div>
                                </div>
                            </td>
                            <td className="product-quantity">
                                <div className="quantity">
                                    <input type="button" value="-" className="minus" onClick={() => dispatch(updateQuantity({ type: 'minus', index }))} />
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    <input type="number" step="1" readOnly min="0" value={item.quantity} name="product_quantity" title="Qty" className="form-control" />
                                    <input type="button" value="+" className="plus" onClick={() => dispatch(updateQuantity({ type: 'plus', index }))} /> <i className="fa fa-angle-up" aria-hidden="true"></i>
                                </div>
                            </td>
                            <td className="product-subtotal"> <span className="currencies">$</span><span className="amount">{item.price}</span> </td>
                            <td className="product-remove"> <a href="#" className="remove fontsize_20" title="Remove this item">
                                <i className="fa fa-trash-o" onClick={(e) => dispatch(removeFromCart(index))}></i>
                            </a> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    return (
        <>
            <HeadSection title="Cart" image={3} />
            {services.length <= 0 ? <EmptyCart /> : (
                <section className="ls section_padding_top_150 section_padding_bottom_150 columns_padding_30">
                    <div className="container">
                        <div className="row">
                            {/* <!-- <div className="col-xs-12 col-md-8 col-lg-8 col-md-push-4 col-lg-push-4"> --> */}
                            <div className="col-sm-12">
                                <TableCart {...{ items: services }} />
                                <div className="cart-collaterals topmargin_50">
                                    <div className="cart_totals">
                                        <h3>Cart Totals</h3>
                                        <table className="table">
                                            <tbody>
                                                <tr className="cart-subtotal">
                                                    <td>Cart Subtotal</td>
                                                    <td><span className="currencies">$</span><span className="amount">{total.toLocaleString()}</span> </td>
                                                </tr>
                                                <tr className="shipping">
                                                    <td>Tax</td>
                                                    <td>0%</td>
                                                </tr>
                                                <tr className="order-total">
                                                    <td className="grey">Order Total</td>
                                                    <td><strong className="grey"><span className="currencies">$</span><span className="amount">{total.toLocaleString()}</span> </strong> </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <Link className="theme_button bg_button color1 min_width_button" to="/cart/check-out">Order now</Link>
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