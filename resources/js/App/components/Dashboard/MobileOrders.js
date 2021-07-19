import React from 'react';
import { Link } from 'react-router-dom';

const MobileOrders = ({ data, page, setPage, totalPage }) => {
    return (
        <>
            {data.map(order => (
                <div className="col-sm-12">
                    <div class="card order-card">
                        <div class="card-body">
                            <h5 class="card-title">Order id: {order.uuid}</h5>
                            <div className="card-list-item-oreder">
                                <span>Status</span>
                                <div>{order.status}</div>
                            </div>
                            <div className="card-list-item-oreder">
                                <span>Amount</span>
                                <div>${order.amount}</div>
                            </div>
                            <div className="card-list-item-oreder">
                                <span>Created At</span>
                                <div>{order.date}</div>
                            </div>
                            <Link to={`/cabinet/dashboard/show/${order.id}`} className="theme_button color1">
                                Show Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            <div style={{ textAlign: 'center', padding: 25, display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={() => {
                        setPage((s) => (s === 0 ? 0 : s - 1));
                    }}
                    disabled={page === 1}
                >
                    Prev page
                </button>

                <button
                    onClick={() => {
                        setPage((s) => s + 1);
                    }}
                    disabled={page === totalPage}
                >
                    Next page
                </button>
            </div>
        </>
    )
};

export default MobileOrders;