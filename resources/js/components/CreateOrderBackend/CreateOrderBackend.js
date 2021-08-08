import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import loadable from '@loadable/component'
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import { customStyles } from '../Calculator/CalculatorTabScreen';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { orderStatusList } from '../UpdateOrderBackend/UpdateOrderBackend';

const Calculator = loadable(() => import('../Calculator/Calculator'))

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
            date: new Date()
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
        formData.append('date', format(values.date, 'MM/dd/yyyy'));
        const data = await axios.post('/admin/orders', formData);

        if (data.data.ok) {
            setSucess(true);
            setFieldValue('calculatedData', null);
            setResetCalculator(true);
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
                                    styles={customStyles}

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
                                    styles={customStyles}
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

                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Date</label>
                                <div>
                                    <DatePicker
                                        className="form-control"
                                        selected={values.date}
                                        onChange={(date) => setFieldValue('date', date)}
                                        customInput={
                                            <InputMask
                                                className="form-control"
                                                mask="99/99/9999"
                                            />
                                        }
                                    />
                                </div>
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
                    <h3 style={{ marginBottom: '25' }} className={"col-md-12"}>
                        Sub total: {values.calculatedData?.total} $
                    </h3>
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