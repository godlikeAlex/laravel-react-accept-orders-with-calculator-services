import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { theme } from '../Layouts/AuthLayout';
import { Alert, ThemeProvider } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';
import { useHistory } from 'react-router-dom';
import { ROUTE_PREFIX } from '../App/App';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required(),
  password: Yup.string().required()
});

const Login = () => {
  const {loading, auth, user, error} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth && user) {
      history.push(`${ROUTE_PREFIX}/dashboard`);
    }
  }, [auth, user]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in | EasyWay Installer
          </Typography>
          
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              disabled={loading}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email && formik.touched.email}
              helperText={formik.errors.email && formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              disabled={loading}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}

              error={formik.errors.password && formik.touched.password}
              helperText={formik.errors.password && formik.touched.password && formik.errors.password}
            />

            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>

            {error && (
              <Alert severity="error" margin="normal">{error}</Alert>
            )}
            

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login;