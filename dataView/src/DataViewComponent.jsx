import React from 'react'
// import { getDataWithIdSelector } from 'reduxApp/dataSlice'
import useDataStore from 'zustand/dataStore'

const DataViewComponent = () => {
    // const data = getDataWithIdSelector()
    const { dataId: data } = useDataStore()
    // console.log(data2, data, 'move');
    return (
        <div className='flex justify-center items-center pt-12 pb-10 relative'>
            <div className='flex flex-col gap-6 bg-white border w-1/2 px-10 py-16 rounded-lg drop-shadow-lg'>
                <h1 className='text-2xl sm:text-5xl mb-3'>Data for {data?.firstName}</h1>
                <div className='flex gap-3 sm:text-xl'>
                    <span>First Name:</span>
                    <span>{data?.firstName}</span>
                </div>
                <div className='flex gap-3 sm:text-xl'>
                    <span>Last Name:</span>
                    <span>{data?.lastName}</span>
                </div>
                <div className='flex gap-3 sm:text-xl'>
                    <span>Contact:</span>
                    <span>{data?.contact}</span>
                </div>
                <div className='flex gap-3 sm:text-xl'>
                    <span>Active:</span>
                    <span>{data?.active ? 'true' : 'false'}</span>
                </div>
                <div className='flex sm:text-xl gap-3'>
                    <span>Email:</span>
                    <span className='!text-wrap'>{data?.email}</span>
                </div>
                <div className='flex sm:text-xl gap-3'>
                    <span>About:</span>
                    <span>{data?.about}</span>
                </div>

            </div>
        </div>
    )
}

export default DataViewComponent