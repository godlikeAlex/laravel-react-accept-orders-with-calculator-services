import axios from 'axios';
import React, { useState } from 'react';
import HeadSection from '../HeadSection';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function FargotPassword() {
    const [state, setState] = useState({
        email: '',
        error: '',
        isSubmiting: false
    });
    const [success, setSuccess] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (state.email.length === 0) {
            setState({
                ...state,
                error: 'Email is required'
            });
        }

        setState({
            ...state,
            isSubmiting: true,
            error: ''
        });

        try {
            const { data } = await axios.post('/api/forgot', { email: state.email });
            if (data.message === 'success') {
                setState({
                    ...state,
                    isSubmiting: false,
                    error: ''
                });
                setSuccess(true);
            }
        } catch (error) {
            if (error.response.data.message) {
                setState({
                    ...state,
                    error: error.response.data.message,
                    isSubmiting: false
                });
            }
        }
    }

    return (
        <>
            <HeadSection title="Reset password" image={'reset'} />
            <section className="ls section_padding_top_150 section_padding_bottom_150" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="col-md-6">
                    <div className="container">
                        <div className="row">
                            <form className="shop-register" role="form" onSubmit={onSubmit}>
                                <div className="col-sm-12">
                                    {state.error && (
                                        <div className="alert alert-danger" role="alert">
                                            {state.error}
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
                                            className="form-control"
                                            name="email"
                                            onChange={e => setState({ ...state, email: e.target.value })}
                                            value={state.email}
                                            disabled={state.isSubmiting}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <button type="submit" className="theme_button color1 topmargin_30" disabled={state.isSubmiting}>Reset password</button>
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
                    We have e-malied your password reset link
                </SweetAlert>
            )}
        </>
    )
}