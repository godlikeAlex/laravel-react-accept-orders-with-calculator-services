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