import React, { useState } from 'react';
import { useFormik } from "formik";
import { orderStatusList } from "../UpdateOrderBackend/UpdateOrderBackend";
import Select from "react-select";
import { customStyles } from "../Calculator/CalculatorTabScreen";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import CustomRepeater from '../CustomRepeater';
import { useEffect } from 'react';
import * as Yup from 'yup';
import SweetAlert from 'react-bootstrap-sweetalert';
import './style.css';
import axios from 'axios';
import { format } from 'date-fns';

const CustomOrderSchema = Yup.object().shape({
    user_id: Yup.string().required('User is required.'),
    date: Yup.string().required(),
    services: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Name is Required!'),
            price: Yup.string().required('Price is required!')
        })
    )
});

const CustomOrderBackend = ({ initialData, submit }) => {
    const [error, setError] = useState(false);
    const [success, setSucess] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [listInstallers, setListInstallers] = useState([]);

    const { values, setFieldValue, handleChange, handleSubmit, errors, touched } = useFormik({
        validationSchema: CustomOrderSchema,
        initialValues: initialData ? { ...initialData, sendNotification: true } : {
            total: 0,
            date: new Date(),
            user: null,
            user_id: undefined,
            status: orderStatusList[0],
            notes: '',
            installer_notes: '',
            sendNotification: true,
            phone: '',
            address: '',
            installers: [],
            images: [],
            images_location: [],
            services: [
                { name: 'Service #1', price: 0 }
            ],
        },
        onSubmit: async values => {
            const { success } = await submit({ ...values });

            if (success) {
                setSucess(true);
            } else {
                setError(true);
            }
        }
    });

    useEffect(() => {
        axios.get('/admin/users').then(({ data }) => {
            const users = data.map((user) => ({ value: user.id, label: user.name }));
            setListUsers(users);
            if (initialData) {
                const user = users.find(user => user.value === initialData.user_id);
                setFieldValue('user', user);
                setFieldValue('user_id', user.value);
            }
        });
    }, []);

    useEffect(() => {
        axios.get('/admin/installers').then(({ data }) => {
            const users = data.map((user) => ({ value: user.id, label: user.name }));
            setListInstallers(users);
           
            if (initialData) {
                if (initialData.currentInstallers.length > 0) {
                    const currentInstallersForSelect = initialData.currentInstallers.map(currentInstaller => {
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
            }
        });
    }, []);



    useEffect(() => {
        const total = values.services.reduce((total, service) => Number(total) + Number(service.price), 0);
        setFieldValue('total', total);
    }, [values.services]);

    const addMoreHandler = () => {
        setFieldValue('services', [...values.services, { name: '', price: 0 }]);
    };

    const deleteHandler = (index) => {
        setFieldValue('services', values.services.filter((_, i) => index !== i));
    }

    const handleNotification = () => {
        setFieldValue('sendNotification', !values.sendNotification);
    }

    const updateHandler = (field, value, index) => {
        const services = [...values.services].map((service, idx) => {
            if (index === idx) {
                const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

                if (value.toString() === '') {
                    return {
                        ...service,
                        [field]: value
                    };
                }

                if (field === 'price') {
                    if (regex.test(value.toString())) {
                        return {
                            ...service,
                            [field]: value
                        }
                    }
                } else {
                    return {
                        ...service,
                        [field]: value
                    }
                }

            }

            return service;
        });

        setFieldValue('services', services);
    };

    const refundOrder = () => {
        axios.post(`/admin/dashboard/orders/refund/${initialData.orderId}`).then(({ data }) => {
            if (data.ok) {
                location.reload();
            }
        });
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>User *:</label>
                            <Select
                                styles={customStyles}
                                options={
                                    [...listUsers]
                                }
                                onChange={user => {
                                    setFieldValue('user', user);
                                    setFieldValue('user_id', user.value);
                                }}
                                value={values.user}
                            />
                            <div style={{ color: "red" }}>{errors.user_id && touched.user_id ? errors.user_id : null}</div>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Order Status *:</label>
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
                    {/*
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Phone number</label>
                            <InputMask mask="(999) 999-9999" name="phone" value={values.phone} onChange={handleChange}>
                                {(inputProps) => (
                                    <input
                                        {...inputProps}
                                        type="text"
                                        className="form-control"
                                    />
                                )}
                            </InputMask>
                            {errors.phone && touched.phone ? (
                                <div className="error">{errors.phone}</div>
                            ) : null}
                        </div>
                    </div> */}

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Date *:</label>
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
                            <div style={{ color: "red" }}>{errors.date && touched.date ? errors.date : null}</div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Address *:</label>
                            <textarea name="address" value={values.address} onChange={handleChange} className="form-control" rows="4"> </textarea>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Installers</label>
                            <Select
                                isMulti
                                value={values.installers}
                                styles={customStyles}
                                options={listInstallers}
                                onChange={installers => {
                                    setFieldValue('installers', installers)
                                }}
                            />
                        </div>
                    </div>

                    {initialData && (
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>UUID</label>
                                <input name="uuid" value={values.uuid} onChange={handleChange} className="form-control" rows="4" />
                            </div>
                        </div>
                    )}

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


                    {values.status?.value === 'completed' && (
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

                    {/* Custom repeater. */}
                    <hr />
                    <CustomRepeater
                        services={values.services}
                        deleteHandler={deleteHandler}
                        addMoreHandler={addMoreHandler}
                        updateHandler={updateHandler}
                    />
                </div>
            </div>

            <div style={{ color: 'red' }} className="col-md-12">
                {errors.services && touched.services ? 'Error in custom services' : null}
            </div>

            <div className="col-md-12">
                <div class="form-group">
                    <label>Files {initialData && <>(adds new photos without deleting older)</>} </label>
                    <input
                        type="file"
                        class="form-control-file"
                        multiple
                        onChange={e => {
                            setFieldValue('images_location', e.target.files)
                        }}
                    />
                </div>
            </div>

            <h3 className="col-md-12">Subtotal: {values.total.toLocaleString()} $</h3>
            <h3 className="col-md-12">Subtotal (With tax): {(+values.total * 1.0875).toLocaleString()} $</h3>

            <div className="col-md-12">
                <div class="form-check" onClick={handleNotification}>
                    <input class="form-check-input" type="checkbox" checked={values.sendNotification} id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        Send notification 🔔
                    </label>
                </div>
            </div>

            {initialData && (
                <div className="col-md-12">
                    <a className="btn btn-primary" style={{ marginBottom: 15, marginTop: 15 }} onClick={refundOrder}>Refund</a>
                    {values.status.value === 'refunded' && (<p style={{ "color": "red" }}>Order all ready refunded</p>)}
                </div>
            )}


            <div className="card-footer">
                <button type="submit" className="btn btn-primary">Submit form</button>
            </div>

            {success && (
                <SweetAlert
                    success
                    showCancel
                    title="Success"
                    onConfirm={() => {
                        window.location.href = '/admin/orders'
                    }}
                    onCancel={() => {
                        setSucess(false);
                    }}
                >
                    Do you want go to all orders?
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
                    Please try again
                </SweetAlert>
            )}
        </form >
    )
}

export default CustomOrderBackend;
