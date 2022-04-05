import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import UpdatePassword from './UpdatePassword';
const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationUserInfo = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email()
})

const UpdateInstallerProfile = ({user}) => {
  const userInfoForm = new useFormik({
    initialValues: {
      name: '',
      email: '',
      avatar: null,
      preview: '/frontend/avatar.png'
    },
    validationSchema: validationUserInfo,

    onSubmit: async (values, {setFieldError}) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      
      
      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }

      try {
        const response = await axios.post('/installer/dashboard/update/profile', formData);
        
        if (response.status === 200) {
          toast('Profile successfully updated', {
            type: 'success'
          });
        }
      } catch (error) {
        const response = error.response;
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

  useEffect(() => {
    let parsedUser = JSON.parse(user);

    userInfoForm.setValues({
      name: parsedUser.name,
      email: parsedUser.email,
      preview: parsedUser.avatar ? `/storage/${parsedUser.avatar}` : '/frontend/avatar.png',
    });
  }, []);

  return (
    <div className="col-md-12">
        <div className="row" style={{marginTop: 10, marginBottom: 10}}>
          
          <form className="col-md-12 mb-25" onSubmit={userInfoForm.handleSubmit}>
            <h4 className="col-md-12">User information</h4>

            <div className="form-group">
              <div className="col-sm-12" style={{ textAlign: 'center' }}>
                  <img src={userInfoForm.values.preview} style={{ width: 125, height: 125, borderRadius: '50%' }} alt={userInfoForm.values.avatar} />
                  <br />
                  <input
                      onChange={e => {
                          userInfoForm.setValues({
                              ...userInfoForm.values,
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
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                  <label>Full name</label>
                  <input 
                    name="name" 
                    onChange={userInfoForm.handleChange} 
                    type="text" 
                    className="form-control" 
                    value={userInfoForm.values.name}
                  />
                  {userInfoForm.errors.name && userInfoForm.touched.name ? (
                      <div className="error" style={{color: 'red', fontSize: '13px', fontWeight: 'bold'}}>{userInfoForm.errors.name}</div>
                  ) : null}
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                  <label>Email</label>
                  <input 
                    name="email" 
                    onChange={userInfoForm.handleChange} 
                    type="email" 
                    className="form-control" 
                    value={userInfoForm.values.email}
                  />
                  {userInfoForm.errors.email && userInfoForm.touched.email ? (
                      <div className="error" style={{color: 'red', fontSize: '13px', fontWeight: 'bold'}}>{userInfoForm.errors.email}</div>
                  ) : null}
              </div>
            </div>

            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">Update user information</button>
            </div>

          </form>

          <UpdatePassword />

          <ToastContainer />

        </div>
    </div>
  )
}

export default UpdateInstallerProfile;