import React from 'react';
import InputMask from 'react-input-mask';
import { useFormik } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { SignupSchema } from './auth-validation';
import axios from 'axios';
import { initAuth } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './AuthAPI';
import HeadSection from '../HeadSection';

function SignUp() {
    const { isAuth, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { handleSubmit, handleChange, values, errors, touched, isSubmitting, setFieldError } = useFormik({
        validationSchema: SignupSchema,
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const { data } = await signup(values);
                if (data.ok) {
                    localStorage.setItem('token', data.token);
                    dispatch(initAuth({ user: data.user }));
                }
                setSubmitting(false);
            } catch (error) {
                if (error.response.data.message) {
                    setFieldError('loginError', error.response.data);
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
            <HeadSection title="Signup" image={4} />
            <section className="ls section_padding_top_150 section_padding_bottom_150">
                <div className="container">
                    <div className="row">
                        <form className="shop-register" role="form" onSubmit={handleSubmit}>
                            <div className="col-sm-12">
                                {errors.loginError && (
                                    <div className="alert alert-danger" role="alert">
                                        {errors.loginError.message}
                                        <ul>
                                            <li>😥 {errors.loginError.errors[Object.keys(errors.loginError.errors)[0]][0]}</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group validate-required" id="billing_first_name_field">
                                    <label className="control-label">
                                        <span className="grey">Name:</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        name="name"
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    <div className="error">{errors.name && touched.name ? errors.name : null}</div>
                                </div>
                                <div className="form-group" id="billing_company_field">
                                    <label className="control-label">
                                        <span className="grey">Phone:</span>
                                    </label>
                                    <InputMask mask="(999) 999-9999" name="phone" value={values.phone} onChange={handleChange} disabled={isSubmitting}>
                                        {(inputProps) => (
                                            <input {...inputProps} type="text" className="form-control" />
                                        )}
                                    </InputMask>
                                    <div className="error">{errors.phone && touched.phone ? errors.phone : null}</div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group validate-required validate-email" id="billing_email_field">
                                    <label className="control-label">
                                        <span className="grey">Email Address:</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    <div className="error">{errors.email && touched.email ? errors.email : null}</div>

                                </div>
                                <div className="form-group validate-required" id="billing_last_name_field">
                                    <label className="control-label">
                                        <span className="grey">Password:</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    <div className="error">{errors.password && touched.password ? errors.password : null}</div>

                                </div>
                            </div>



                            <div className="col-sm-12">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="theme_button color1 topmargin_30"
                                >
                                    Register Now
                                </button>
                            </div>
                        </form>

                        <div className="col-sm-12" style={{ marginTop: "30px" }}>
                            All ready have an account? <Link to="/cabinet/login">Login</Link> now!
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp;