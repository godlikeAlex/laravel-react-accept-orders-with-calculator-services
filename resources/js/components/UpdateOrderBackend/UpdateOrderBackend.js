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
import UploadImages from '../UploadImages';
const Calculator = loadable(() => import('../Calculator/Calculator'))
const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

export const orderStatusList = [
    { value: 'pending', label: 'Pending ⏳' },
    { value: 'approved', label: 'Approved 👍🏻' },
    { value: 'cancled', label: 'Cancled ❌' },
    { value: 'on the way', label: 'On the way ✅' },
    { value: 'in process', label: 'In process ✅' },
    { value: 'last step to complete', label: 'Last step to complete ✅' },
    { value: 'done', label: 'Done ⏳' },
    { value: 'completed', label: 'Completed ✅' },
    { value: 'we are hit a traffic on the way', label: 'We are hit a traffic on the way 🚥' },
    { value: 'material is not there', label: 'Material is not there 🚫' },
    { value: 'can not access to start a job', label: 'Can not access to start a job 🔒' },
    { value: 'we received wrong job information', label: 'We received wrong job information 🚫' },
    { value: 'refunded', label: 'Refunded 🔁' }
];

function UpdateOrderBackend({ order, installers }) {
    const [error, setError] = useState(false);
    const [success, setSucess] = useState(false);
    const [resetCalculator, setResetCalculator] = useState(false);
    const currentOrder = JSON.parse(order);
    const [listInstallers, setListInstallers] = useState([]);

    const { values, setFieldValue, handleSubmit, handleChange } = useFormik({
        initialValues: {
            calculatedData: JSON.parse(currentOrder.details),
            status: orderStatusList.find(status => currentOrder.status === status.value),
            date: new Date(currentOrder.date),
            notes: currentOrder.notes,
            address: currentOrder.address,
            installers: [],
            installer_notes: currentOrder.installer_notes,
            uuid: currentOrder.uuid,
            sendNotification: currentOrder.recive_notifaction,
            images: [],
        },
        onSubmit: async values => {
            const formData = new FormData();

            const {services, additional} = values.calculatedData;

            formData.append('details', JSON.stringify({
                services,
                additional,
            }));

            formData.delete('images[]');
            formData.delete('installers');

            formData.append('status', values.status.value);
            formData.append('notes', values.notes);
            formData.append('notify', values.sendNotification);
            formData.append('installer_notes', values.installer_notes);
            formData.append('uuid', values.uuid);
            formData.append('address', values.address);
            formData.append('notify', Number(values.sendNotification));
            formData.append('date', (new Date(values.date)).toUTCString());
            formData.append('_method', 'put');

            if (values.installers.length > 0) {
                const formatedInstallers = values.installers.map(installer => {
                    return installer.value;
                });
                formData.append('installers', JSON.stringify(formatedInstallers));
            }

            if (values.images) {
                Array.from(values.images).forEach(img => {
                    formData.append('images[]', img);
                })
            }

            try {
                const response = await fetch(`/admin/orders/${currentOrder.id}`, {
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

    const handleNotification = () => {
        setFieldValue('sendNotification', !values.sendNotification);
    }

    React.useEffect(() => {
        axios.get('/admin/installers').then(({ data }) => {
            const users = data.map((user) => ({ value: user.id, label: user.name }));
            setListInstallers(users);
            const currentInstallers =  JSON.parse(installers);

            if (currentInstallers.length > 0) {
                const currentInstallersForSelect = currentInstallers.map(currentInstaller => {
                    const installer = data.find(installer => installer.id === currentInstaller.id);
                    if (installer) {
                        return {
                            value: installer.id,
                            label: installer.name
                        }
                    }

                });

                setFieldValue('installers', currentInstallersForSelect);
            }
        });

    }, []);

    const refundOrder = () => {
        axios.post(`/admin/dashboard/orders/refund/${currentOrder.id}`).then(({ data }) => {
            if (data.ok) {
                location.reload();
            }
        });
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
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        customInput={
                                            <InputMask
                                                className="form-control"
                                                mask="99/99/9999 99:99"
                                            />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea name="notes" value={values.notes} onChange={handleChange} className="form-control" rows="4"> </textarea>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Notes for installer</label>
                                <textarea name="installer_notes" value={values?.installer_notes} onChange={handleChange} className="form-control" rows="4"> </textarea>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Address</label>
                                <textarea name="address" value={values.address} onChange={handleChange} className="form-control" rows="4"> </textarea>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Installers</label>
                                <Select
                                    styles={customStyles}
                                    isMulti
                                    options={listInstallers}
                                    onChange={installers => {
                                        setFieldValue('installers', installers)
                                    }}
                                    value={values.installers}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>UUID</label>
                                <input name="uuid" value={values.uuid} onChange={handleChange} className="form-control" rows="4" />
                            </div>
                        </div>

                        {['done', 'completed'].includes(values.status.value) && (
                            <div className="col-md-12">
                                <UploadImages 
                                    orderId={currentOrder.id} 
                                    disableEditing={values.status.value === 'completed'}
                                />
                            </div>
                        )}
                    </div>

                    <hr />
                    <div className="col-md-12">
                        <Calculator
                            calculateOptionalPrices={true}
                            resetAllFields={resetCalculator}
                            showOptions={false}
                            data={values.calculatedData}
                            onUpdate={(calculatedData) => { setFieldValue('calculatedData', calculatedData) }}
                        />
                    </div>

                    <h3 style={{ marginBottom: '25' }} className={"col-md-12"}>
                        Sub total: {(+values.calculatedData?.total).toFixed(2).toLocaleString()} $
                        <br />
                        <br />
                        Sub total (with tax): {(+values.calculatedData?.total * 1.0875).toFixed(2).toLocaleString()} $
                    </h3>

                    <div className="col-md-12">
                        <div class="form-check" onClick={handleNotification}>
                            <input class="form-check-input" type="checkbox" checked={values.sendNotification} id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Send notification 🔔
                            </label>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <a className="btn btn-primary" style={{ marginBottom: 15, marginTop: 15 }} onClick={refundOrder}>Refund</a>
                        {values.status.value === 'refunded' && (<p style={{ "color": "red" }}>Order all ready refunded</p>)}
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
