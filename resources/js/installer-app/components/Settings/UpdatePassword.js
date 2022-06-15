import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import UserService from '../../services/UserService';

export const UpdatePassword = () => {
    const {values, handleSubmit, handleChange, errors, touched} = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        onSubmit: async (passwords, {setFieldError}) => {
            try {
                const response = await UserService.updatePassword(passwords);

                if (response.status === 200) {
                    toast('Password updated successfully', {
                      type: 'success'
                    });
                }
            } catch (error) {
                const response = error.response;

                if (response.status === 400) {
                  setFieldError('oldPassword', response.data.error);
                }
        
                if (response.status === 422) {
                  const {errors} = response.data;
        
                  for(let error in errors) {
                    setFieldError(error, errors[error][0]);
                  }
                }
        
                toast('Something went wrong 😢', {
                  type: 'error'
                });
            }
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
                <TextField
                    label="Old password"
                    name="oldPassword"
                    autoComplete="password"
                    fullWidth
                    value={values.oldPassword}
                    onChange={handleChange}
                    error={errors.oldPassword && touched.oldPassword}
                    helperText={errors.oldPassword && touched.oldPassword && errors.oldPassword}
                />
            </Grid>

            <Grid item md={4} xs={12}>
                <TextField
                    label="New password"
                    name="newPassword"
                    autoComplete="password"
                    fullWidth
                    value={values.newPassword}
                    onChange={handleChange}
                    error={errors.newPassword && touched.newPassword}
                    helperText={errors.newPassword && touched.newPassword && errors.newPassword}
                />
            </Grid>

            <Grid item md={4} xs={12}>
                <TextField
                    label="Confirm password"
                    name="confirmPassword"
                    autoComplete="password"
                    fullWidth
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword && touched.confirmPassword}
                    helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                />
            </Grid>

            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" color="primary" size="medium" onClick={handleSubmit}>
                    Update password
                </Button>
            </Grid>

        </Grid>
    )
};