import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { validationSchemaSignUp } from './util/validationSchemas';
// import { registerUser, registerOtpVerify } from 'reduxApp/userSlice'
import useUserStore from 'zustand/userStore'

const SignUpComponent = ({ navigate }) => {
    // const dispatch = useDispatch();
    const { registerUser, registerOtpVerify } = useUserStore()
    const [loading, setLoading] = useState(false);

    const [showOtpInput, setShowOtpInput] = useState(false)


    const {
        values, handleSubmit, touched, handleBlur, handleChange, errors, setErrors, setFieldTouched
    } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            otp: ''
        },
        validationSchema: validationSchemaSignUp,
        validateOnChange: true,
        onSubmit: async (values) => {
            if (!showOtpInput) {
                setLoading(true);
                // let res = await dispatch(registerUser(values))
                let res = await registerUser(values)
                console.log(res, 'responss');
                if (res.status == 200) {
                    setShowOtpInput(true)
                    setLoading(false)
                } else {
                    setLoading(false)
                    setErrors({ submit: res.message });
                }
            } else if (values.otp.length > 3) {
                // let res = await dispatch(registerOtpVerify({ email: values.email, otp: values.otp, password: values.password, name: values.name }))
                let res = await registerOtpVerify({ email: values.email, otp: values.otp, password: values.password, name: values.name })
                if (res.status == 200) {
                    navigate(`/login?email=${values.email}`, { replace: true });
                    setLoading(false)
                } else {
                    setLoading(false)
                    setErrors({ submit: res.message });
                }
            } else {
                setErrors({ otp: "enter a valid otp" });
            }
        },
    });
    let disabledFlag = loading
    // || !(values.name.length > 0 && values.email.length > 0 && values.confirmPassword.length > 0 && values.password.length > 0)
    console.log(disabledFlag, 'flag', errors);
    return (
        <div className='h-screen min-h-[650px] flex items-center justify-center bg-gray-100'>
            <div className='relative sm:w-full sm:max-w-md w-[90%] p-5 py-6 md:p-8 bg-white shadow-lg rounded-lg'>
                <h1 className='text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800'>
                    Sign Up
                </h1>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor='name' className='block sm:text-lg font-medium text-gray-700 mb-1'>
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={values.name}
                            onChange={(e) => {
                                setFieldTouched('name')
                                handleChange(e)
                            }}
                            onBlur={handleBlur}
                            className={`block w-full px-4 py-1 sm:py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.name && errors.name && (
                            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor='email' className='block sm:text-lg font-medium text-gray-700 mb-1'>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={(e) => {
                                setFieldTouched('email')
                                handleChange(e)
                            }}
                            onBlur={handleBlur}
                            className={`block w-full px-4 py-1 sm:py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.email && errors.email && (
                            <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor='password' className='block sm:text-lg font-medium text-gray-700 mb-1'>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={(e) => {
                                setFieldTouched('password')
                                handleChange(e)
                            }}
                            onBlur={handleBlur}
                            className={`block w-full px-4 py-1 sm:py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.password && errors.password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor='confirmPassword' className='block sm:text-lg font-medium text-gray-700 mb-1'>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={values.confirmPassword}
                            onChange={(e) => {
                                setFieldTouched('confirmPassword')
                                handleChange(e)
                            }}
                            onBlur={handleBlur}
                            className={`block w-full px-4 py-1 sm:py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>
                        )}
                    </div>
                    {showOtpInput && <div>
                        <label htmlFor='email' className='block sm:text-lg font-medium text-gray-700 mb-1'>
                            Enter OTP sent to your mail
                        </label>
                        <input
                            type="text"
                            name="otp"
                            id="otp"
                            value={values.otp}
                            onChange={(e) => {
                                setFieldTouched('otp')
                                handleChange(e)
                            }}
                            onBlur={handleBlur}
                            className={`block w-full px-4 py-1 sm:py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.otp && errors.otp && (
                            <p className='text-red-500 text-sm mt-1'>{errors.otp}</p>
                        )}
                    </div>}
                    <div className='flex flex-col items-center'>
                        <button
                            type="submit"
                            disabled={disabledFlag}
                            className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        {errors.submit && (
                            <p className='text-red-500 text-sm mt-2'>{errors.submit}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpComponent;
