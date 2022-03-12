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
import { MIN_PRICE } from '../Calculator/Calculator';

const Calculator = loadable(() => import('../Calculator/Calculator'))

function CreateOrderBackend() {
    const [error, setError] = useState(false);
    const [success, setSucess] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [listInstallers, setListInstallers] = useState([]);

    const { values, setFieldValue, initialValues, handleChange } = useFormik({
        initialValues: {
            calculatedData: {
                prices: {
                    installation: MIN_PRICE,
                    removal: 0,
                    survey: 0,
                    urgencyInstsllstion: 0,
                }
            },
            installers: null,
            status: orderStatusList[0],
            notes: '',
            installer_notes: '',
            address: '',
            user: { label: 'User are null', value: null },
            date: new Date(),
            images: []
        }
    });


    useEffect(() => {
        axios.get('/admin/installers').then(({ data }) => {
            const users = data.map((user) => ({ value: user.id, label: user.name }));
            setListInstallers(users);
        });
    }, []);

    useEffect(() => {
        axios.get('/admin/users').then(({ data }) => {
            const users = data.map((user) => ({ value: user.id, label: user.name }));
            setListUsers(users);
        });
    }, []);

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('details', JSON.stringify({
            ...values.calculatedData,
            acceptedServices: {
                installation: values.calculatedData.prices.installation > 0,
                removal: values.calculatedData.prices.removal > 0,
                survey: values.calculatedData.prices.survey > 0,
                urgencyInstsllstion: values.calculatedData.prices.urgencyInstsllstion > 0,
            },
        }));
        formData.delete('images[]');
        formData.delete('installers');
        formData.append('status', values.status.value);
        formData.append('user_id', values.user.value);
        formData.append('notes', values.notes);
        formData.append('installer_notes', values.installer_notes);
        formData.append('address', values.address);
        formData.append('date', (new Date(values.date)).toUTCString());

        if (values.images) {
            Array.from(values.images).forEach(img => {
                formData.append('images[]', img);
            })
        }

        if (values.installers) {
            const formatedInstallers = values.installers.map(installer => {
                return installer.value;
            });
            formData.append('installers', JSON.stringify(formatedInstallers));
        }

        const data = await axios.post('/admin/orders', formData);

        if (data.data.ok) {
            setSucess(true);
        } else {
            setError(true);
        }
    }


    const onUpdateAddationServices = type => {
        const { calculatedData } = values;
        let data = { ...calculatedData.prices };
        switch (type) {
            case 'installation':
                data.installation = calculatedData.prices.installation > 0 ? 0 : calculatedData.totalServices
                break;
            case 'removal':
                data.removal = calculatedData.prices.removal > 0 ? 0 : calculatedData.totalServices * 0.5
                break;
            case 'survey':
                data.survey = calculatedData.prices.survey > 0 ? 0 : 250
                break;
            case 'urgencyInstsllstion':
                data.urgencyInstsllstion = calculatedData.prices.urgencyInstsllstion > 0 ? 0 : calculatedData.totalServices * 0.20
                break;
        }
        if (data.urgencyInstsllstion != 0) {
            const total = data.installation + data.removal + data.survey;
            data.urgencyInstsllstion = total * 0.20
        }

        setFieldValue('calculatedData', {
            ...values.calculatedData,
            prices: data
        })
    }

    return (
        <>
            <form>
                <div className="container-fluid">
                    <div className="row">
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

                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>User *:</label>
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
                                <label>Address *:</label>
                                <textarea name="address" value={values.address} onChange={handleChange} className="form-control" rows="4"> </textarea>
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
                                <label>Installer</label>
                                <Select
                                    isMulti
                                    styles={customStyles}
                                    options={listInstallers}
                                    onChange={installers => {
                                        setFieldValue('installers', installers)
                                    }}
                                    value={values.installer}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-md-12">
                        <h4>Additional services</h4>
                    </div>
                    <div
                        className="form-group col-md-12"
                    >
                        <input
                            type="checkbox"
                            onClick={() => onUpdateAddationServices('installation')}
                            checked={values.calculatedData.prices.installation > 0}
                        />
                        <label style={{ marginLeft: 15 }} onClick={() => onUpdateAddationServices('installation')}>Installation</label>
                    </div>

                    <div
                        className="form-group col-md-12"
                    >
                        <input
                            type="checkbox"
                            onClick={() => onUpdateAddationServices('removal')}
                            checked={values.calculatedData.prices.removal > 0}
                        />
                        <label style={{ marginLeft: 15 }} onClick={() => onUpdateAddationServices('removal')}>Removal</label>
                    </div>

                    <div
                        className="form-group col-md-12"
                    >
                        <input
                            type="checkbox"
                            onClick={() => onUpdateAddationServices('survey')}
                            checked={values.calculatedData.prices.survey > 0}
                        />
                        <label style={{ marginLeft: 15 }} onClick={() => onUpdateAddationServices('survey')}>Survey</label>
                    </div>

                    <div
                        className="form-group col-md-12"
                    >
                        <input
                            type="checkbox"
                            onClick={() => onUpdateAddationServices('urgencyInstsllstion')}
                            checked={values.calculatedData.prices.urgencyInstsllstion > 0}
                        />
                        <label style={{ marginLeft: 15 }} onClick={() => onUpdateAddationServices('urgencyInstsllstion')}>Urgency Instsllstion ⚡</label>
                    </div>


                    <hr />
                    <div className="col-md-12">
                        <Calculator
                            calculateOptionalPrices={true}
                            showOptions={false}
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
                        setFieldValue('calculatedData', initialValues.calculatedData)
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
