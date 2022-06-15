import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../Layouts/AuthLayout';
import { Grid, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import UserService from '../../services/UserService';
import { toast } from 'react-toastify';
import { updateProfile } from '../../slices/authSlice';
import { UpdatePassword } from './UpdatePassword';


const Settings = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const {values, handleChange, setValues, handleSubmit} = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            preview: user.avatar ? `/storage/${user.avatar}` : '/frontend/avatar.png',
        },
        onSubmit: async values => {
            try {
                const result = await UserService.updateProfile(values);

                toast('Profile updated', {
                    type: 'success'
                });

                dispatch(updateProfile(result.data));
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <AuthLayout>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Personal Info
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{textAlign: 'center'}}>
                        <img src={values.preview} style={{ width: 125, height: 125, borderRadius: '50%' }} />
                        <br />
                        <input
                            onChange={e => {
                                setValues({
                                    ...values,
                                    avatar: e.target.files[0],
                                    preview: URL.createObjectURL(e.target.files[0])
                                })
                            }}
                            type="file"
                            id="upload"
                            hidden={true}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="upload" style={{ cursor: 'pointer' }}>Choose file</label>
                    </Box>
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        label="Your name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        fullWidth
                        value={values.name}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item md={6} xs={12}>
                    <TextField
                        label="Email Addresses"
                        name="email"
                        autoComplete="email"
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" color="primary" size="medium" onClick={handleSubmit}>
                        Update personal information
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5">
                        Password
                    </Typography>

                    <UpdatePassword />
                </Grid>
                
            </Grid>
        </AuthLayout>
    )
}

export default Settings;