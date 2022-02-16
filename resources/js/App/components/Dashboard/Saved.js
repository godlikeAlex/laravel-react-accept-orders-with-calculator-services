import React, { useEffect, useState } from 'react';
import HeadSection from '../HeadSection';
import ReactLoading from 'react-loading';
import EmptyDashboard from './EmptyDashboard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns/esm';
import { extendCart, initCart } from '../../redux/cartSlice';
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

function Saved() {
    const [savedForLater, setSavedForLetter] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModalOrders, setShowModalOrders] = useState(false);
    const [ordersModal, setOrdersModal] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        axios.get('/api/wish/list', { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => {
            setSavedForLetter(data.wishlist);
            const convertedData = data.wishlist.map((item) => {
                return {
                    ...item,
                    details: JSON.parse(item.details)
                }
            });
            setSavedForLetter(convertedData);
            setIsLoading(false);
        })
    }, []);

    const removeItem = id => {
        axios.get(`/api/wish/remove/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => {
            if (data.ok) {
                setSavedForLetter(savedForLater.filter(wishlist => wishlist.id !== id));
            }
        })
    }

    const addToCart = wish => {
        dispatch(extendCart(wish.details));
        history.push('/cart');
    }


    const content = () => savedForLater.length === 0 ? <EmptyDashboard title="No saved items" /> : (
        <div className="container" style={{ marginTop: '100px', marginBottom: '100px' }}>
            <div className="row">
                {savedForLater.map((wish) => (
                    <div className="col-md-6">
                        <article class="post event-item side-item side-sm content-padding with_border ">
                            <div class="row">
                                <div class="col-sm-7">
                                    <div class="item-content" style={{ padding: "40px 20px" }}>
                                        <header class="entry-header">
                                            <div class="entry-meta small-text">
                                                <div class="highlight"> <time datetime="2017-10-03T08:50:40+00:00">{format(Date.parse(wish.created_at), 'd MMM Y')}</time> </div>
                                            </div>
                                            <h3 class="entry-title"> {wish.name} </h3>
                                        </header>
                                        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                            {new Array(1).fill(wish.details.services[0]).map((service) => (
                                                <li style={{ borderTop: '1px solid #e8e8e8', padding: '10px 15px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <h5 style={{ fontWeight: 'normal', margin: 0 }}>{service.currentService.label}</h5>
                                                        <span style={{ color: 'black', fontWeight: 'bold' }}>{service.price} $</span>
                                                    </div>
                                                    <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase', marginTop: 5 }}>Width: {service.width};  Height: {service.height};</div>
                                                    <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {service.ftHeight.title};</div>
                                                </li>
                                            ))}
                                            <li style={{ textAlign: 'center' }}>
                                                <a class="theme_button color1" style={{ cursor: 'pointer' }} onClick={() => {
                                                    setShowModalOrders(true);
                                                    setOrdersModal(wish.details.services);
                                                }}>See more</a>
                                            </li>
                                        </ul>
                                        <hr />
                                        <div className="row" style={{ flexDirection: 'column', minHeight: '215px' }}>
                                            {wish.details.prices.installation > 0 && (
                                                <div className="col-md-12">
                                                    <h6 style={{ color: 'black' }}>Instalation price: <strong>${wish.details.prices.installation.toLocaleString()}</strong></h6>
                                                </div>
                                            )}

                                            {wish.details.prices.removal > 0 && (
                                                <div className="col-md-12">
                                                    <h6 style={{ color: 'black' }}>Removal price: <strong>$ {wish.details.prices.removal.toLocaleString()}</strong></h6>
                                                </div>
                                            )}

                                            {wish.details.prices.survey > 0 && (
                                                <div className="col-md-12">
                                                    <h6 style={{ color: 'black' }}>Site survey: <strong>$ {wish.details.prices.survey.toLocaleString()}</strong></h6>
                                                </div>
                                            )}

                                            {wish.details.prices.urgencyInstsllstion > 0 && (
                                                <div className="col-md-12">
                                                    <h6 style={{ color: 'black' }}>Urgency installation: <strong>$ {wish.details.prices.urgencyInstsllstion.toLocaleString()}</strong></h6>
                                                </div>
                                            )}

                                            <div className="col-md-12">
                                                <h6>Subtotal: ${wish.details.total.toLocaleString()}</h6>
                                            </div>
                                        </div>
                                        <div className="row" style={{ flexWrap: 'wrap' }}>
                                            <div className="col-md-12">
                                                <div className="theme_button bg_button color1 min_width_button" onClick={() => { addToCart(wish) }} style={{ width: '100%', paddingTop: 15, paddingBottom: 15 }}>Add to cart</div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="theme_button bg_button color1 min_width_button" onClick={() => { removeItem(wish.id) }} style={{ width: '100%', paddingTop: 15, paddingBottom: 15 }}>Delete</div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </div >
    )

    const loadingContainer = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px', height: '100%', marginBottom: '100px' }}>
            <ReactLoading type="spin" color="#333" />
        </div>
    )

    return (
        <>
            <HeadSection title={'Saved for later'} image={'saved'} />
            <div className="container">
                <div className="row">
                    {isLoading ? loadingContainer() : content()}
                </div>
            </div>

            {showModalOrders && (
                <SweetAlert
                    title="All items"
                    onCancel={() => {
                        setShowModalOrders(false)
                    }}
                    showConfirm={false}
                    showCloseButton={true}
                    onConfirm={() => {
                        // setSuceess(false);
                    }}
                >
                    {ordersModal.map((service, key) => (
                        <ul style={{ listStyle: 'none', paddingLeft: 0, textAlign: 'left' }}>
                            <li key={`order-${key}`} style={{ borderTop: '1px solid #e8e8e8', padding: '10px 15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h5 style={{ fontWeight: 'normal', margin: 0 }}>{service.currentService.label}</h5>
                                    <span style={{ color: 'black', fontWeight: 'bold' }}>{service.price} $</span>
                                </div>
                                <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase', marginTop: 5 }}>Width: {service.width};  Height: {service.height};</div>
                                <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {service.ftHeight.title};</div>
                            </li>
                        </ul>
                    ))}
                </SweetAlert>
            )}
        </>
    )
}

export default Saved;