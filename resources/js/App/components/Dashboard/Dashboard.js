import React, { useState } from 'react';
import HeadSection from '../HeadSection';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import { useMediaQuery } from 'react-responsive'
import ReactLoading from 'react-loading';
import TableOrders from './TableOrders';
import useOrders from './useOrders';
import MobileOrders from './MobileOrders';
import LoadingSpinner from '../Auth/LoadingSpinner';
import EmptyDashboard from './EmptyDashboard';

const Dashboard = () => {
    const [ordersOrder, setOrdersOrder] = useState('all');
    const [page, setPage] = useState(1);
    const [orders, lastPage, isLoading] = useOrders(page, ordersOrder);
    const tableOrders = orders?.map((order) => {
        return {
            id: order.id,
            uuid: order.uuid,
            status: order.status,
            amount: order.amount,
            date: format(Date.parse(order.date), 'MMM dd yyyy HH:mm'),
            actions: order.id
        }
    });

    const data = React.useMemo(() => tableOrders, [orders]);

    const isMobile = useMediaQuery({ maxWidth: 767 })

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'UUID',
                accessor: 'uuid',
            },
            {
                Header: 'STATUS',
                accessor: 'status',
            },
            {
                Header: 'AMOUNT',
                accessor: 'amount',
                Cell: ({ value }) => (
                    <span>
                        {value} $
                    </span>
                )
            },
            {
                Header: 'SCHEDULE DATE',
                accessor: 'date',
            },
            {
                width: 300,
                Header: '',
                accessor: 'actions',
                Cell: ({ value }) => (
                    <>
                        <Link to={`/cabinet/dashboard/show/${value}`} className="theme_button color1">
                            Show Details
                        </Link>
                    </>
                )
            },
        ],
        []
    )


    const content = () => orders.length === 0 ? <EmptyDashboard title="No Orders yet" /> : (
        !isMobile ? (
            <div className="col-sm-12">
                <TableOrders {...{ data, columns, setPage, page }} totalPage={lastPage} />
            </div>
        ) : <MobileOrders {...{ data, setPage, page }} totalPage={lastPage} />
    )

    const loadingContainer = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px', height: '100%', marginBottom: '100px' }}>
            <ReactLoading type="spin" color="#333" />
        </div>
    )

    return (
        <>
            <HeadSection title={'Dashboard'} image={'dashboard'} />
            <div className="container">
                <div className="row">
                    {!isLoading && (
                        <div className="flex justify-between bg-red-100 p-4 col-md-12">
                            <button onClick={() => setOrdersOrder('all')}>
                                All orders
                            </button>{' '}
                            <button onClick={() => setOrdersOrder('completed')}>
                                Completed orders
                            </button>{' '}
                        </div>
                    )}
                    {isLoading ? loadingContainer() : content()}
                </div>
            </div>
        </>
    )
}

export default Dashboard;