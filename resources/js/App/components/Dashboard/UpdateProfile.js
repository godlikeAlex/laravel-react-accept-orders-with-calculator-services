import React, { useEffect, useState } from 'react';
import HeadSection from '../HeadSection';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { updateUser } from '../Auth/authSlice';
import * as Yup from 'yup';
import PaymentMethods from './PaymentMethods';

function UpdateProfile() {
    const { user, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [success, setSuceess] = useState(false);
    const [error, setError] = useState(false);

    const formikPassword = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().min(7).required('Old password is required'),
            newPassword: Yup.string().min(7).required('New password is required'),
            confirmPassword: Yup.string().min(7).oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        }),
        onSubmit: async ({ oldPassword, newPassword, confirmPassword }, { setErrors }) => {
            const formData = new FormData();
            formData.append('oldPassword', oldPassword);
            formData.append('newPassword', newPassword);
            formData.append('confirmPassword', confirmPassword);
            try {
                const result = await axios.post('/api/user/change-password', formData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (result.data.ok) {
                    setSuceess(true);
                } else {
                    setError(true);
                }

            } catch (error) {
                if (error.response) {
                    const responseError = error.response.data.errors;
                    let errors = {};
                    Object.keys(responseError).forEach(field => {
                        errors[field] = responseError[field][0];
                    })
                    setErrors(errors)
                }
            }
        }
    });

    const { values, handleChange, isSubmitting, handleSubmit, errors, setValues, touched } = useFormik({
        initialValues: {
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.address,
            avatar: user.avatar ? `/storage/${user.avatar}` : '/frontend/avatar.png',
            fileAvatar: null
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string().required('Phone is required'),
            address: Yup.string().nullable('')
        }),
        onSubmit: async ({ email, name, phone, address, fileAvatar, avatar }, { setErrors }) => {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('name', name);
            if (address) {
                formData.append('address', address);
            }

            if (phone) {
                formData.append('phone', phone);
            }

            if (fileAvatar) {
                formData.append('avatar', fileAvatar);
            }
            try {
                const result = await axios.post('/api/user/update-profile', formData, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (result.data.ok) {
                    setSuceess(true);
                    dispatch(updateUser({
                        email, name, phone, address, avatar: result.data.avatar
                    }));
                }

            } catch (error) {
                if (error.response) {
                    const responseError = error.response.data.errors;
                    let errors = {};
                    Object.keys(responseError).forEach(field => {
                        errors[field] = responseError[field][0];
                    })
                    setErrors(errors)
                }
            }

        }
    })

    return (
        <>
            <HeadSection title={'Update my profile'} image={'update-profile'} />
            <section className="ls section_padding_top_150 section_padding_bottom_150 columns_padding_30">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 col-lg-10">
                            <h2 className="topmargin_20">Personal information</h2>

                            <form onSubmit={handleSubmit} className="form-horizontal checkout shop-checkout" role="form">
                                <div className="form-group">
                                    <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                        <img src={values.avatar} style={{ width: 125, height: 125, borderRadius: '50%' }} alt="" />
                                        <br />
                                        <input
                                            onChange={e => {
                                                setValues({
                                                    ...values,
                                                    avatar: URL.createObjectURL(e.target.files[0]),
                                                    fileAvatar: e.target.files[0]
                                                })
                                            }}
                                            type="file"
                                            id="upload"
                                            hidden={true}
                                            style={{ display: 'none' }}
                                        />
                                        <label for="upload" style={{ cursor: 'pointer' }}>Choose file</label>
                                    </div>
                                </div>
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Your name:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            disabled={isSubmitting}
                                            onChange={handleChange}
                                            value={values.name}
                                        />
                                        {errors.name && touched.name ? (
                                            <div className="error">{errors.name}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Email:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            disabled={isSubmitting}
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email ? (
                                            <div className="error">{errors.email}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Phone number:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <InputMask mask="(999) 999-9999" name="phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                        >
                                            {(inputProps) => (
                                                <input
                                                    {...inputProps}
                                                    type="text"
                                                    className="form-control"
                                                />
                                            )}
                                        </InputMask>
                                        {/* {errors.phone && touched.phone ? (
                                            <div className="error">{errors.phone}</div>
                                        ) : null} */}
                                    </div>
                                </div>
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Address:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            disabled={isSubmitting}
                                            onChange={handleChange}
                                            value={values.address}
                                        />
                                        {errors.address && touched.address ? (
                                            <div className="error">{errors.address}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="form-group" style={{ textAlign: 'center', paddingTop: '15px' }}>
                                    <div className="container">
                                        <button type="submit" className="theme_button bg_button color1 btn-calc" >UPDATE PROFILE</button>

                                    </div>
                                </div>
                                {success && (
                                    <SweetAlert
                                        success
                                        title="Success"
                                        timeout={2000}
                                        confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                                        confirmBtnStyle={{ boxShadow: 'unset' }}
                                        onConfirm={() => {
                                            setSuceess(false);
                                        }}
                                    >
                                        Your profile was successfully updated!
                                    </SweetAlert>
                                )}

                                {error && (
                                    <SweetAlert
                                        error
                                        title="Error"
                                        timeout={2000}
                                        onConfirm={() => {
                                            setError(false);
                                        }}
                                        confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                                        confirmBtnStyle={{ boxShadow: 'unset' }}
                                    >
                                        Whoops... Something went wrong.
                                    </SweetAlert>
                                )}
                            </form>

                            <h2 className="topmargin_20" style={{ marginTop: '50px' }}>Update password</h2>
                            <form onSubmit={formikPassword.handleSubmit} className="form-horizontal checkout shop-checkout" role="form">
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Current password:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="oldPassword"
                                            onChange={formikPassword.handleChange}
                                            value={formikPassword.values.oldPassword}
                                        />
                                        {formikPassword.errors.oldPassword && formikPassword.touched.oldPassword ? (
                                            <div className="error">{formikPassword.errors.oldPassword}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">New password:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="newPassword"
                                            onChange={formikPassword.handleChange}
                                            value={values.newPassword}
                                        />
                                        {formikPassword.errors.newPassword && formikPassword.touched.newPassword ? (
                                            <div className="error">{formikPassword.errors.newPassword}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="col-sm-3 control-label">
                                        <span className="grey">Confirm password:</span>
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirmPassword"
                                            onChange={formikPassword.handleChange}
                                            value={formikPassword.values.confirmPassword}
                                        />
                                        {formikPassword.errors.confirmPassword && formikPassword.touched.confirmPassword ? (
                                            <div className="error">{formikPassword.errors.confirmPassword}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="form-group" style={{ textAlign: 'center', paddingTop: '15px' }}>
                                    <div className="container">
                                        <button type="submit" className="theme_button bg_button color1 btn-calc" >UPDATE PASSWORD</button>
                                    </div>
                                </div>
                            </form>
                            <h2 className="topmargin_20 col-md-12" style={{ marginTop: '50px' }}>Payment methods</h2>
                            <PaymentMethods />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UpdateProfile;