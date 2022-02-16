import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    password: Yup.string().min(7).required(),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7).required(),
});

export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(7).required('Password is required'),
    password_confirm: Yup.string().min(7).required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
});