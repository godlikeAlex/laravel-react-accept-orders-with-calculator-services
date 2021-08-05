import { useFormik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import loadable from '@loadable/component'

const Calculator = loadable(() => import('../Calculator/Calculator'))

const orderStatusList = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'cancled', label: 'Cancled' },
    { value: 'are going', label: 'Are going' },
    { value: 'on process', label: 'On process' },
    { value: 'finished', label: 'Finished' },
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
            image: null
        },
        onSubmit: async values => {
            const formData = new FormData();
            formData.append('details', JSON.stringify(values.calculatedData));
            formData.append('status', values.status.value);
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
                        <div className="col-md-12">
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
                        {values.status.value === 'finished' && (
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
