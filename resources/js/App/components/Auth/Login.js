import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from './AuthAPI';
import { LoginSchema } from './auth-validation';
import { initAuth } from './authSlice';
import HeadSection from '../HeadSection';

function Login() {
    const { isAuth, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { handleSubmit, handleChange, values, errors, touched, setFieldError, isSubmitting } = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const { data } = await login(values);
                if (data.ok) {
                    localStorage.setItem('token', data.token);
                    dispatch(initAuth({ user: data.user, token: data.token }));
                    setSubmitting(false);
                }
            } catch (error) {
                if (!error.response.data.ok) {
                    setFieldError('loginError', error.response.data.error);
                }
                setSubmitting(false);
            }
        }
    });

    if (isAuth && user) {
        return <Redirect to="/cabinet/dashboard" />
    }

    return (
        <>
            <HeadSection title="Login" image={'login'} />
            <section className="ls section_padding_top_150 section_padding_bottom_150" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="col-md-6">
                    <div className="container">
                        <div className="row">
                            <form className="shop-register" role="form" onSubmit={handleSubmit}>
                                <div className="col-sm-12">
                                    {errors.loginError && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.loginError}
                                        </div>
                                    )}
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group validate-required" id="billing_first_name_field">
                                        <label className="control-label">
                                            <span className="grey">Email Address:</span>
                                        </label>
                                        <input
                                            type="text"
                                            disabled={isSubmitting}
                                            className="form-control"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email ? (
                                            <div className="error">{errors.email}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group validate-required validate-email" id="billing_email_field">
                                        <label className="control-label">
                                            <span className="grey">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            disabled={isSubmitting}
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
                                    <button disabled={isSubmitting} type="submit" className="theme_button color1 topmargin_30">Login Now</button>
                                </div>

                                <div className="col-sm-12" style={{ marginTop: "30px" }}>
                                    Don't have an account yet? <Link to="/cabinet/sign-up">Sign Up</Link> now!
                                </div>

                                <div className="col-sm-12" style={{ marginTop: "30px" }}>
                                    Fargot your password? <Link to="/cabinet/fargot-password">Reset</Link> it now!
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;