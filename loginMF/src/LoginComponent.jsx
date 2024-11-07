import React, { useState } from 'react'
import { validationSchemaLogin } from './util/validationSchemas';
import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';
// import { loginUser, loginOtpVerify } from 'reduxApp/userSlice'
import useUserStore from 'zustand/userStore'


const LoginComponent = ({ navigate, useSearchParams }) => {

    // const dispatch = useDispatch()
    const { loginUser, loginOtpVerify } = useUserStore()
    const [loading, setLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams()

    const emailPrefill = searchParams.get('email')

    const [showOtpInput, setShowOtpInput] = useState(false)

    const {
        values, handleSubmit, touched, handleBlur, handleChange, errors, setErrors, setFieldTouched
    } = useFormik({
        initialValues: {
            email: emailPrefill || '',
            password: '',
            otp: ''
        },
        validationSchema: validationSchemaLogin,
        validateOnChange: true,
        onSubmit: async (values) => {
            if (!showOtpInput) {
                setLoading(true);
                // let res = await dispatch(loginUser(values))
                let res = await loginUser(values)
                console.log(res, 'responss');
                if (res.status == 200) {
                    if (res.data) {
                        navigate('/data', { replace: true })
                    } else {
                        setShowOtpInput(true)
                        setLoading(false)
                    }
                } else {
                    setLoading(false)
                    setErrors({ submit: res.message });
                }
            } else if (values.otp.length > 3) {
                // let res = await dispatch(loginOtpVerify({ email: values.email, otp: values.otp }))
                let res = await loginOtpVerify({ email: values.email, otp: values.otp })
                if (res.status == 200) {
                    navigate('/data', { replace: true })
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
    return (
        <div className='flex h-full justify-center items-center'>
            <div className='sm:w-full sm:max-w-md w-[90%] p-5 py-6 md:p-8 bg-white shadow-lg rounded-lg'>
                <h1 className='text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800'>
                    Login
                </h1>
                <form onSubmit={handleSubmit} className='space-y-6'>
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
                            className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                            className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.password && errors.password && (
                            <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
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
                            className='w-full px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                        >
                            {loading ? 'logging in...' : "login"}
                        </button>

                        <span>new user ?  <button className='text-lg text-blue-300 underline' onClick={() => navigate('/signUp')}>Sign Up</button></span>
                        {errors.submit && (
                            <p className='text-red-500 text-sm mt-2'>{errors.submit}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComponent

