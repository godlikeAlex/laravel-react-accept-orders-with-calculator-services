import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().min(7).required(),
  newPassword: Yup.string().min(7).required(),
  confirmPassword: Yup.string().min(7).oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

const UpdatePassword = () => {
  const {handleSubmit, values, handleChange, errors, touched} = useFormik({
    validationSchema,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    onSubmit: async (values, {setFieldError}) => {
      try {
        const response = await axios.post('/installer/dashboard/update/profile/password/change', values);

        if (response.status === 200) {
          toast('Password updated successfully', {
            type: 'success'
          });
        }
        console.log(response);
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
    <form className="col-md-12 mb-25" onSubmit={handleSubmit} style={{paddingTop: '25px'}}>
    <h4 className="col-md-12">Update password</h4>

    <div className="col-md-12">
      <div className="form-group">
          <label>Old Password</label>
          <input 
            name="oldPassword" 
            onChange={handleChange} 
            type="password" 
            className="form-control" 
            value={values.oldPassword}
          />
          {errors.oldPassword && touched.oldPassword ? (
              <div className="error" style={{color: 'red', fontSize: '13px', fontWeight: 'bold'}}>{errors.oldPassword}</div>
          ) : null}
      </div>
    </div>

    <div className="col-md-12">
      <div className="form-group">
          <label>New Password</label>
          <input 
            name="newPassword" 
            onChange={handleChange} 
            type="password" 
            className="form-control" 
            value={values.newPassword}
          />
          {errors.newPassword && touched.newPassword ? (
              <div className="error" style={{color: 'red', fontSize: '13px', fontWeight: 'bold'}}>{errors.newPassword}</div>
          ) : null}
      </div>
    </div>

    <div className="col-md-12">
      <div className="form-group">
          <label>Confirm your password</label>
          <input 
            name="confirmPassword" 
            onChange={handleChange} 
            type="password" 
            className="form-control" 
            value={values.confirmPassword}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
              <div className="error" style={{color: 'red', fontSize: '13px', fontWeight: 'bold'}}>{errors.confirmPassword}</div>
          ) : null}
      </div>
    </div>

    <div className="col-md-12">
      <button type="submit" className="btn btn-primary">Update password</button>
    </div>

  </form>
  )
}

export default UpdatePassword;