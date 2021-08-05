import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import loadable from '@loadable/component'

const Calculator = loadable(() => import('../Calculator/Calculator'))

const orderStatusList = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'cancled', label: 'Cancled' },
    { value: 'finished', label: 'Finished' },
    { value: 'are going', label: 'Are going' },
    { value: 'on process', label: 'On process' }
];

function CreateOrderBackend() {
    const [error, setError] = useState(false);
    const [success, setSucess] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [resetCalculator, setResetCalculator] = useState(false);

    useEffect(() => {
        axios.get('/admin/users').then(({ data }) => {
            const users = data.map((user) => ({ value: user.id, label: user.name }));
            setListUsers(users);
        });
    }, []);

    const { values, setFieldValue } = useFormik({
        initialValues: {
            calculatedData: null,
            status: orderStatusList[0],
            user: { label: 'User are null', value: null },
        },
        onSubmit: async values => {
            const data = await axios.post('/admin/orders/create');
            console.log(data);
            console.log(values);
        }
    });

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('details', JSON.stringify(values.calculatedData));
        formData.append('status', values.status.value);
        formData.append('user_id', values.user.value);
        const data = await axios.post('/admin/orders', formData);
        setFieldValue('calculatedData', null);
        setResetCalculator(true);
        if (data.data.ok) {
            setSucess(true);
        } else {
            setError(true);
        }
    }

    return (
        <>
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Order Status</label>
                                <Select
                                    options={orderStatusList}
                                    onChange={status => {
                                        setFieldValue('status', status)
                                    }}
                                    value={values.status}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>User</label>
                                <Select
                                    options={
                                        [{ label: 'User are null', value: null }, ...listUsers]
                                    }
                                    onChange={user => {
                                        setFieldValue('user', user);
                                    }}
                                    value={values.user}
                                />
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="col-md-12">
                        <Calculator
                            resetAllFields={resetCalculator}
                            data={values.calculatedData}
                            onUpdate={(calculatedData) => { setFieldValue('calculatedData', calculatedData) }}
                        />
                    </div>

                    <div className="col-12">
                        <p className="lead">Amount Due 2/22/2014</p>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody><tr>
                                    <th style={{ width: '50%' }}>Subtotal:</th>
                                    <td>${values.calculatedData?.total || 0}</td>
                                </tr>
                                    <tr>
                                        <th>Tax (9.3%)</th>
                                        <td>$10.34</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping:</th>
                                        <td>$5.80</td>
                                    </tr>
                                    <tr>
                                        <th>Total:</th>
                                        <td>$265.24</td>
                                    </tr>
                                </tbody></table>
                        </div>
                    </div>
                </div>
            </form>
            <div className="card-footer">
                <button type="submit" className="btn btn-primary" onClick={() => onSubmit()}>Create an order</button>
            </div>

            {success && (
                <SweetAlert
                    success
                    showCancel
                    title="Order Created"
                    onConfirm={() => {
                        setSucess(false);
                        setResetCalculator(false);
                    }}
                    onCancel={() => window.location.href = '/admin/orders'}
                >
                    Order created! Do you want creat a new one?
                </SweetAlert>
            )}

            {error && (
                <SweetAlert
                    error
                    title="Error while creating order"
                    onConfirm={() => {
                        setError(false);
                    }}
                >
                    Plese try again
                </SweetAlert>
            )}
        </>
    );
}

export default CreateOrderBackend;