import { useFormik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import loadable from '@loadable/component'
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import { customStyles } from '../Calculator/CalculatorTabScreen';
import { format } from 'date-fns';
const Calculator = loadable(() => import('../Calculator/Calculator'))

export const orderStatusList = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'cancled', label: 'Cancled' },
    { value: 'last step to complete', label: 'Last step to complete' },
    { value: 'in process', label: 'In process' },
    { value: 'completed', label: 'Completed' },
];

function UpdateOrderBackend({ order }) {
    const [error, setError] = useState(false);
    const [success, setSucess] = useState(false);
    const [resetCalculator, setResetCalculator] = useState(false);
    const currentOrder = JSON.parse(order);

    const { values, setFieldValue, handleSubmit } = useFormik({
        initialValues: {
            calculatedData: JSON.parse(currentOrder.details),
            status: orderStatusList.find(status => currentOrder.status === status.value),
            date: new Date(currentOrder.date),
            image: null
        },
        onSubmit: async values => {
            const formData = new FormData();
            formData.append('details', JSON.stringify(values.calculatedData));
            formData.append('status', values.status.value);
            formData.append('date', format(values.date, 'MM/dd/yyyy'));
            formData.append('_method', 'put');
            if (values.image) {
                formData.append('image', values.image);
            }

            const { data } = await axios.post(`/admin/orders/${currentOrder.id}`, formData);

            setSucess(data.ok);
        }
    });

    // const onSubmit = async () => {
    //     const formData = new FormData();
    //     formData.append('details', JSON.stringify(values.calculatedData));
    //     formData.append('status', values.status.value);
    //     const data = await axios.post('/admin/orders', formData);
    //     setFieldValue('calculatedData', null);
    //     setResetCalculator(true);
    //     console.log(data, success);
    //     if (data.data.ok) {
    //         setSucess(true);
    //     } else {
    //         setError(true);
    //     }
    // }


    return (
        <>
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Order Status</label>
                                <Select
                                    isSearchable={false}
                                    options={orderStatusList}
                                    styles={customStyles}
                                    className={'reselect2-order'}
                                    onChange={status => {
                                        setFieldValue('status', status)
                                    }}
                                    value={values.status}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
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
                        {values.status.value === 'completed' && (
                            <div className="col-md-12">
                                <div class="form-group">
                                    <label >Result photo</label>
                                    <input
                                        type="file"
                                        class="form-control-file"
                                        onChange={e => {
                                            setFieldValue('image', e.target.files[0])
                                        }}
                                    />
                                </div>
                            </div>
                        )}
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Update an order</button>
            </div>

            {success && (
                <SweetAlert
                    success
                    title="Order updated"
                    timeout={2000}
                    onConfirm={() => {
                        setSucess(false);
                    }}
                >
                    Updated
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
                    Update order
                </SweetAlert>
            )}
        </>
    );
}

export default UpdateOrderBackend;
