import { useFormik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import { customStyles } from '../Calculator/CalculatorTabScreen';
import { orderStatusList } from '../UpdateOrderBackend/UpdateOrderBackend';
import { SRLWrapper } from 'simple-react-lightbox';
const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;


function UpdateOrderBackend({ order, user, images }) {
    const [error, setError] = useState(false);
    const [success, setSucess] = useState(false);
    const currentOrder = JSON.parse(order);
    const orderUser = JSON.parse(user);

    const { values, setFieldValue, handleSubmit, handleChange } = useFormik({
        initialValues: {
            status: orderStatusList.find(status => currentOrder.status === status.value),
            date: new Date(currentOrder.date),
            notes: currentOrder.notes,
            address: currentOrder.address,
            installer_notes: currentOrder.installer_notes,
            installer: null,
            uuid: currentOrder.uuid,
            images: [],
        },
        onSubmit: async values => {
            const formData = new FormData();
            formData.delete('images[]');
            formData.append('status', values.status.value);
            formData.append('_method', 'put');

            if (values.images) {
                for (const image of values.images) {
                    formData.append('images[]', image);
                }
            }

            try {
                const response = await fetch(`/installer/dashboard/edit/order/${currentOrder.id}`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        "X-CSRF-Token": csrfToken,
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setSucess(data.ok);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.log('errorrrr');
                // window.location.reload();
            }
        }
    });


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
                                <label>UUID</label>
                                <input name="uuid" disabled value={values.uuid} onChange={handleChange} className="form-control" rows="4" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div href={`tel:${orderUser.phone}`} className="form-group">
                                <label>Phone</label>
                                <a href={`tel:${orderUser.phone}`}>
                                    <input name="uuid" disabled value={orderUser.phone} className="form-control" rows="4" />
                                </a>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Address</label>
                                <input name="address" disabled value={values.address} className="form-control" rows="4" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Order notes</label>
                                <textarea name="notes" disabled className="form-control" rows="4">
                                    {values.notes}
                                </textarea>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Notes for installer</label>
                                <textarea name="installer_notes" disabled value={values?.installer_notes} className="form-control" rows="4"> </textarea>
                            </div>
                        </div>

                        <hr />

                        <h3 className="col-md-12">Order Details</h3>

                        <table class="table margin_0">
                            <tbody>
                                {JSON.parse(currentOrder.details).services.map(service => (
                                    currentOrder.custom === 0 ? (
                                        <tr>
                                            <th class="grey medium">
                                                {service.currentService.label} X {service.quantity}
                                                <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Width: {service.width};</div>
                                                <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Height: {service.height};</div>
                                                <div className="grey" style={{ fontSize: '13px', textTransform: 'uppercase' }}>Foot Height: {service.ftHeight.title};</div>
                                            </th>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <th class="grey medium">
                                                {service.name}
                                            </th>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>

                        <SRLWrapper>
                            <div className="row col-md-12">
                                {JSON.parse(images).map(image => (
                                    <a className="col-12 col-md-2" style={{ marginBottom: '20px' }} href={`/storage/${image.path}`}>
                                        <img style={{ width: '100%' }} src={`/storage/${image.path}`} />
                                    </a>
                                ))}
                            </div>
                        </SRLWrapper>

                        {values.status.value === 'completed' && (
                            <div className="col-md-12">
                                <div class="form-group">
                                    <label >Result photo</label>
                                    <input
                                        type="file"
                                        class="form-control-file"
                                        multiple
                                        onChange={e => {
                                            setFieldValue('images', e.target.files)
                                        }}
                                    />
                                </div>
                            </div>
                        )}
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
