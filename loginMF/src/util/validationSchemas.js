import * as Yup from 'yup';

export const validationSchemaLogin = Yup.object({
    email: Yup.string().email('Invalid email address').min(6).max(35).required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(/^[^\s]*$/, 'Password must not contain spaces')
        // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        // .matches(/[0-9]/, 'Password must contain at least one number')
        // .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~`]/, 'Password must contain at least one special character')
        .required('Required'),
    otp: Yup.number().min(100000).max(9999999)

});




export const validationSchemaSignUp = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Name can be two words at max and one space in between')
        .min(3, 'Name must be at least 3 characters')
        .max(35, 'Name should be less than 35 characters')
        .required('Required'),
    email: Yup.string().email('Invalid email address').min(6).max(35).required('Required'),
    password: Yup.string()
        .min(4, 'Password must be at least 6 characters')
        .max(18, 'Password should be less than 18 characters')
        .matches(/^[^\s]*$/, 'Password must not contain spaces')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~`]/, 'Password must contain at least one special character')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    otp: Yup.number().min(100000).max(9999999)
});