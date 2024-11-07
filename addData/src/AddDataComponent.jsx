import React from 'react'
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import {addData} from 'reduxApp/dataSlice'
import useDataStore from 'zustand/dataStore'

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
        .min(6)
        .max(36)
        .required('Required'),
    contact: Yup.string()
        .matches(/^\+?\d{8,}$/, 'Contact not valid')
        .required('Required'),
    about: Yup.string()
        .required('Required'),
});





const AddDataComponent = ({navigate}) => {

const {addData} = useDataStore()

    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const {
        values, handleSubmit, touched, handleBlur, handleChange, errors, setErrors, setFieldTouched, resetForm
    } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            contact: '',
            active: false,
            about: '',
        },
        validationSchema: validationSchemaData,
        validateOnChange: true,
        onSubmit: async (values) => {
            setLoading(true)
            // let res = await dispatch(addData(values))
            let res = await addData(values)
            console.log(res , 'add ress');
            setLoading(false)
          if(res.status == 200){
            navigate('/data')
          } else {
            setErrors({ submit: res.data });
          }
        },
    });



    const regexContact = /^\+?\d{0,}$/

    return (
        <div className='w-[80%] mx-auto'>
            <form onSubmit={handleSubmit} className='flex flex-col p-5 gap-8 border bg-white drop-shadow-md rounded-lg'>
            {errors.submit && (
                                <div className='flex flex-col gap-1 items-start'>
                                    <p className='text-lg text-red-500'>{errors.submit}</p>
                                </div>
                            )}
                <h1 className='text-3xl text-center bg-emerald-300 py-2'>Add Data</h1>
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
                      {loading ? 'Adding...'  :'Add Data' }
                    </button>
                  
                </form>

        </div>
    )
}

export default AddDataComponent





// import React, { useRef } from 'react';
// import { useFormik } from 'formik';
// import { useOutsideAlerter } from '../../../hooks/customHooks';
// import { IoMdClose } from "react-icons/io";
// import { dispatchAsyncLoader } from '../../../utils/dispatchAsyncLoader';
// import { useDispatch } from 'react-redux';
// import { addData, getData } from '../../../features/dataSlice';
// import { validationSchemaData } from '../../../utils/validationSchemas';



// const AddDataElement = ({ setShowDataTab, searchParams, setSearchParams }) => {
//     const [loading, setLoading] = React.useState(false);
//     const [errMsg, setErrMsg] = React.useState(null);

//     const overlayRef = useRef();
//     useOutsideAlerter(overlayRef, () => setShowDataTab(false), []);

//     return (
//         <div className='flex fixed inset-0 bg-[#0000009a] top-0 left-0 justify-center items-center z-20'>
//             <div ref={overlayRef} className='flex h-h-full flex-col bg-white border drop-shadow-lg gap-8 w-[90%] md:w-2/3 px-4 py-8 rounded-lg'>
//                 <div className='flex justify-end'>
//                     <IoMdClose className='cursor-pointer' size={28} onClick={() => setShowDataTab(null)} />
//                 </div>
                
//             </div>
//         </div>
//     );
// };
// export default AddDataElement;