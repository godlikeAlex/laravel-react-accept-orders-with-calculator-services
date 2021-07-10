import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import HeadSection from '../HeadSection';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import { useMediaQuery } from 'react-responsive'
import ReactLoading from 'react-loading';

const Dashboard = () => {
    const [data, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const token = localStorage.getItem('token');
    // const data = React.useMemo(
    //     () => [
    //         {
    //             col1: 'Hello',
    //             col2: 'World',
    //         },
    //         {
    //             col1: 'react-table',
    //             col2: 'rocks',
    //         },
    //         {
    //             col1: 'whatever',
    //             col2: 'you want',
    //         },
    //     ],
    //     []
    // )

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
            },
            {
                Header: 'CREATED ORDER DATE',
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

    useEffect(() => {
        axios.get('/api/user/orders', { headers: { 'Authorization': `Bearer ${token}` } }).then(({ data }) => {
            const tableOrders = data.orders.data.map((order) => {
                return {
                    id: order.id,
                    uuid: order.uuid,
                    status: order.status,
                    amount: order.amount,
                    date: format(Date.parse(order.created_at), 'd MMM Y'),
                    actions: order.id
                }
            });
            setOrders(tableOrders);
            setLoading(false);
        })
    }, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    const content = () => (
        !isMobile ? (
            <div className="col-sm-12">
                <table id="timetable" className="table_template" {...getTableProps()} >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                style={{
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        ) : data.map(order => (
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
        ))
    )

    const loadingContainer = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px', height: '100%' }}>
            <ReactLoading type="spin" color="#333" />
        </div>
    )

    return (
        <>
            <HeadSection title={'Dashboard'} image={4} />
            <div className="container">
                <div className="row">
                    {loading ? loadingContainer() : content()}
                </div>
            </div>
        </>
    )
}

export default Dashboard;