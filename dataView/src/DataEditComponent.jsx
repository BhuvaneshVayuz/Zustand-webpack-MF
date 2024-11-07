import React from 'react'
// import { getDataWithIdSelector, editData } from 'reduxApp/dataSlice'
import useDataStore from 'zustand/dataStore'
// import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

const validationSchemaData = Yup.object({
    firstName: Yup.string()
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'First Name can be two words at max and one space in between')
        .min(3).max(24)
        .required('Required'),
    lastName: Yup.string()
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Last Name can be two words at max and one space in between')
        .min(3).max(24)
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    contact: Yup.string()
        .matches(/^\+?\d{8,}$/, 'Contact not valid')
        .required('Required'),
    about: Yup.string()
        .required('Required'),
});





const DataEditComponent = ({ navigate }) => {
    // const item = getDataWithIdSelector()
    const { dataId: item, editData } = useDataStore()

    // const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)



    const {
        values, handleSubmit, touched, handleBlur, handleChange, errors, setErrors, setFieldTouched, resetForm
    } = useFormik({
        initialValues: {
            firstName: item?.firstName || '',
            lastName: item?.lastName || '',
            email: item?.email || '',
            contact: item?.contact || '',
            active: item?.active || false,
            about: item?.about || '',
        },
        validationSchema: validationSchemaData,
        validateOnChange: true,
        onSubmit: async (values) => {
            setLoading(true)
            // let res = await dispatch(editData({ id: item.id, data: values }))
            let res = await editData({ id: item.id, data: values })
            console.log('res res', res);
            setLoading(false)
            if (res.status == 200) {
                navigate('/data')
            } else {
                setErrors({ submit: res.data });
            }
        },
    });



    const regexContact = /^\+?\d{0,}$/



    return (
        <div className='flex flex-col gap-5 border bg-white rounded-lg p-5 drop-shadow-lg'>
            {errors.submit && (
                <div className='flex flex-col gap-1 items-start'>
                    <p className='text-lg text-red-500'>{errors.submit}</p>
                </div>
            )}
            <h1 className='text-center text-4xl bg-emerald-100 py-2'>Edit ur Data</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex flex-wrap gap-8 px-2'>
                    <div className='grow sm:min-w-[350px] flex flex-col gap-2'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={values.firstName}
                            onChange={(e) => {
                                setFieldTouched('firstName')
                                handleChange(e)
                            }}
                            onBlur={handleBlur}
                            className={`px-2 py-1 bg-transparent border-b ${touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.firstName && errors.firstName && (
                            <p className='text-red-500 text-sm'>{errors.firstName}</p>
                        )}
                    </div>
                    <div className='grow sm:min-w-[350px] flex flex-col gap-2'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={values.lastName}
                            onChange={(e) => {
                                setFieldTouched('lastName')
                                handleChange(e)
                            }}
                            onBlur={handleBlur}
                            className={`px-2 py-1 bg-transparent border-b ${touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.lastName && errors.lastName && (
                            <p className='text-red-500 text-sm'>{errors.lastName}</p>
                        )}
                    </div>
                </div>
                <div className='flex gap-8 px-2 flex-wrap'>
                    <div className='grow sm:min-w-[350px] flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
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
                            className={`px-2 py-1 bg-transparent border-b ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.email && errors.email && (
                            <p className='text-red-500 text-sm'>{errors.email}</p>
                        )}
                    </div>
                    <div className='grow sm:min-w-[350px] flex flex-col gap-2'>
                        <label htmlFor="contact">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            id="contact"
                            value={values.contact}
                            onChange={(e) => {
                                setFieldTouched('contact')
                                regexContact.test(e.target.value) && handleChange(e)
                            }}
                            onBlur={handleBlur}
                            className={`px-2 py-1 bg-transparent border-b ${touched.contact && errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {touched.contact && errors.contact && (
                            <p className='text-red-500 text-sm'>{errors.contact}</p>
                        )}
                    </div>
                </div>
                <div className='px-2 mx-auto my-2'>
                    <label className="inline-flex items-center cursor-pointer gap-5">
                        <span className="ms-3 text-lg font-medium text-gray-900">User Status</span>
                        <input type="checkbox"
                            name="active"
                            id="active"
                            checked={values.active}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>

                </div>
                <div className='px-2'>
                    <label htmlFor="about" className='mb-2 block'>About</label>
                    <textarea
                        name="about"
                        id="about"
                        value={values.about}
                        onChange={(e) => {
                            setFieldTouched('about')
                            handleChange(e)
                        }}
                        onBlur={handleBlur}
                        className={`bg-transparent resize-none border rounded-lg w-[90%] mx-auto block min-h-28 px-4 py-3 ${touched.about && errors.about ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder='about...'
                    />
                    {touched.about && errors.about && (
                        <p className='text-red-500 text-sm'>{errors.about}</p>
                    )}
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className='px-8 py-2 bg-green-600 text-white text-lg mx-auto rounded-lg'
                >
                    {loading ? 'Saving' : 'Save'}
                </button>
            </form>
        </div>
    )
}

export default DataEditComponent