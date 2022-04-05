import { useFormik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import "react-datepicker/dist/react-datepicker.css";
import { customStyles } from '../Calculator/CalculatorTabScreen';
import { SRLWrapper } from 'simple-react-lightbox';
import UploadImages from '../UploadImages';
const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;


export const orderStatusList = [
    { value: 'pending', label: 'Pending ⏳' },
    { value: 'approved', label: 'Approved 👍🏻' },
    { value: 'cancled', label: 'Cancled ❌' },
    { value: 'on the way', label: 'On the way ✅' },
    { value: 'in process', label: 'In process ✅' },
    { value: 'last step to complete', label: 'Last step to complete ✅' },
    { value: 'done', label: 'Done ✅' },
    { value: 'completed', label: 'Completed ✅', isDisabled: true },
    { value: 'we are hit a traffic on the way', label: 'We are hit a traffic on the way 🚥' },
    { value: 'material is not there', label: 'Material is not there 🚫' },
    { value: 'can not access to start a job', label: 'Can not access to start a job 🔒' },
    { value: 'we received wrong job information', label: 'We received wrong job information 🚫' },
    { value: 'refunded', label: 'Refunded 🔁' }
];


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
            installerCustomNote: '',
            installer: null,
            uuid: currentOrder.uuid,
            images: [],
        },
        onSubmit: async values => {
            const formData = new FormData();
            formData.delete('images[]');
            formData.append('status', values.status.value);
            formData.append('_method', 'put');

            if (values.installerCustomNote) {
                formData.append('installerCustomNote', values.installerCustomNote);
            }

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
            }
        }
    });


    return (
        <>
            <form>
                <div className="container-fluid">
                    <div className="row" style={{padding: '10px'}}>

                        <div className="col-6">
                            <div>
                                <label><i class="fa fa-hashtag" aria-hidden="true"></i> UUID: {values.uuid}</label>
                            </div>

                            <div>
                                <label>Address:</label>
                                <p>{values.address}</p>
                            </div>
                        </div>

                        <div className="col-6">
                            <label   style={{fontWeight: 'bold'}}>
                                <i class="fa fa-phone" aria-hidden="true"></i> <a href={`tel:${orderUser.phone}`}>{orderUser.phone}</a>
                            </label>

                            <div>
                            <label style={{fontWeight: 'bold'}}>
                                <i class="fa fa-map" aria-hidden="true"></i> <a href='#'>Directions</a>
                            </label>
                            </div>
                        </div>

                        <hr />

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Order notes:</label>
                                <p>
                                    {values.notes}
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Notes for installer:</label>
                                <p>
                                {values?.installer_notes}
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Order Status: {values.status.value === 'completed' && 'Completed ✅'}</label>
                                {values.status.value !== 'completed' && (
                                    <Select
                                        isSearchable={false}
                                        disabled
                                        options={orderStatusList}
                                        onChange={status => {
                                            setFieldValue('status', status)
                                        }}
                                        value={values.status}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Note from installer :</label>
                                <textarea name="installerCustomNote" value={values.installerCustomNote} onChange={handleChange} className="form-control" rows="4"> </textarea>
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


                        {['done', 'completed'].includes(values.status.value) && (
                            <div className="col-md-12">
                                <UploadImages orderId={currentOrder.id} disableEditing={values.status.value === 'completed'} />
                            </div>
                        )}
                    </div>
                </div>
            </form>

            {values.status.value !== 'completed' && (
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Update an order</button>
                </div>
            )}

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
