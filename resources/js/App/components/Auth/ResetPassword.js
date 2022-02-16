import { useFormik } from 'formik';
import React from 'react';
import axios from 'axios';
import { Link, Redirect, useParams } from 'react-router-dom';
import { ResetPasswordSchema } from './auth-validation';
import HeadSection from '../HeadSection';
import SweetAlert from 'react-bootstrap-sweetalert';

function ResetPassword() {
    const { token } = useParams();
    const [success, setSuccess] = React.useState(false);

    const { handleSubmit, handleChange, values, errors, touched, isSubmitting } = useFormik({
        validationSchema: ResetPasswordSchema,
        initialValues: {
            password: "",
            password_confirm: ""
        },
        onSubmit: ({ password, password_confirm }, { setSubmitting, setFieldError }) => {
            setSubmitting(true);

            axios.post('/api/reset', {
                password,
                password_confirm,
                token
            }).then(({ data }) => {
                if (data.message === 'success') {
                    setSuccess(true);
                    setSubmitting(false);
                }
            }).catch(error => {
                if (error.response.data.message) {
                    setFieldError('resetError', error.response.data.message);
                    setSubmitting(false);
                }
            })
        }
    });

    return (
        <>
            <HeadSection title="Reset your password" image={'reset'} />
            <section className="ls section_padding_top_150 section_padding_bottom_150" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="col-md-6">
                    <div className="container">
                        <div className="row">
                            <form className="shop-register" role="form" onSubmit={handleSubmit}>
                                <div className="col-sm-12">
                                    {errors.resetError && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.resetError}
                                        </div>
                                    )}
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group validate-required" id="billing_first_name_field">
                                        <label className="control-label">
                                            <span className="grey">Password:</span>
                                        </label>
                                        <input
                                            type="password"
                                            disabled={isSubmitting}
                                            className="form-control"
                                            name="password"
                                            onChange={handleChange}
                                            value={values.password}
                                        />
                                        {errors.password && touched.password ? (
                                            <div className="error">{errors.password}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group validate-required validate-email" id="billing_email_field">
                                        <label className="control-label">
                                            <span className="grey">Confirm password</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            disabled={isSubmitting}
                                            name="password_confirm"
                                            onChange={handleChange}
                                            value={values.password_confirm}
                                        />
                                        {errors.password_confirm && touched.password_confirm ? (
                                            <div className="error">{errors.password_confirm}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <button disabled={isSubmitting} type="submit" className="theme_button color1 topmargin_30">Reset password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {success && (
                <SweetAlert
                    success
                    title="Success"
                    timeout={3000}
                    confirmBtnCssClass={"theme_button bg_button color1 min_width_button"}
                    confirmBtnStyle={{ boxShadow: 'unset' }}
                    onConfirm={() => {
                        setSuccess(false);
                    }}
                >
                    Your password has been successfully changed
                </SweetAlert>
            )}
        </>
    )
}

export default ResetPassword;