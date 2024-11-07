import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
// import { getData, getDataSelector, deleteData, getDataLengthSelector } from 'reduxApp/dataSlice'
import useDataStore from 'zustand/dataStore'

import { IoMdClose, IoMdEye } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Loading from './Loading';


const TableComponent = ({ navigate, searchParams, setSearchParams }) => {

    const { fetchData: getData, data: items, dataLength, deleteData } = useDataStore()

    const [loading, setLoading] = useState(true)
    const [deleteLoadingId, setDeleteLoadingId] = useState(null)

    // const items = getDataSelector()

    // const dispatch = useDispatch()



    const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1)

    const limit = searchParams.get('limit') || 5;
    const sort = searchParams.get('sort') || '';
    const added = searchParams.get('added') || '';
    const searchValue = searchParams.get('search') || ''
    // const dataLength = getDataLengthSelector()

    const maxPages = Math.ceil(dataLength / limit)


    useEffect(() => {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), page })
        const fetch = async () => {
            setLoading(true)
            // let res = await dispatch(getData({ searchQuery: searchValue, page, limit, added, sort }))
            let res = await getData({ searchQuery: searchValue, page, limit, added, sort })
            setLoading(false)
        }
        fetch()
    }, [searchParams, page])

    return (
        <>
            <div className='overflow-x-scroll w-full overflow-y-visible border'>

                {deleteLoadingId &&
                    <div className='fixed inset-0 z-30 flex justify-center items-center bg-[#000000bc]'>
                        <div className='flex w-[90%] sm:w-fit flex-col gap-3 sm:gap-5 items-center border drop-shadow-lg rounded-lg px-1 sm:px-2 pt-3 pb-6 bg-white'>
                            <div className='flex justify-end w-full'><IoMdClose className='cursor-pointer' size={28} onClick={() => setDeleteLoadingId(null)} /></div>
                            <span className='text-lg sm:text-2xl md:text-3xl px-3 sm:px-8 mb-7'>Are you sure you wanna delete this data ?</span>
                            <div className='flex gap-20 justify-center'>
                                <button className='sm:text-xl bg-green-600 px-6 rounded-lg py-2' onClick={() => setDeleteLoadingId(null)}>no</button>
                                <button className='sm:text-xl bg-pink-600 px-6 rounded-lg py-2' onClick={async () => {
                                    await dispatch(deleteData(deleteLoadingId))
                                    setDeleteLoadingId(null)
                                }}>Yes</button>
                            </div>
                        </div>
                    </div>
                }


                <div className="min-w-[750px] w-full relative min-h-[100px] text-center">
                    <div className="bg-gray-50 flex border-b border-gray-200">
                        <div className="w-[120px] px-3 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase">Sr. No.</div>
                        <div className="flex-1 px-3 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase">First Name</div>
                        <div className="flex-1 px-3 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase">Last Name</div>
                        <div className="flex-1 px-3 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</div>
                        <div className="w-[120px] px-3 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase">View</div>
                        <div className="w-[120px] px-3 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase">Edit</div>
                        <div className="w-[120px] px-3 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase">Delete</div>
                    </div>
                    <div className="min-h-[300px] relative">
                        {(loading) ?
                            <div className='absolute inset-0 flex justify-center items-center pt-6'>
                                <Loading />
                            </div>
                            :
                            <>
                                {items?.map((el, index) => (
                                    <div key={el.id} className='flex flex-col border-b border-gray-200'>
                                        <div className='flex'>
                                            <div className='w-[120px] px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{(limit * (page - 1)) + index + 1}</div>
                                            <div className='flex-1 px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{el.firstName.length > 18 ? el.firstName.slice(0, 18) + '...' : el.firstName}</div>
                                            <div className='flex-1 px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{el.lastName.length > 18 ? el.lastName.slice(0, 18) + '...' : el.lastName}</div>
                                            <div className='flex-1 px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{el.email.length > 18 ? el.email.slice(0, 18) + '...' : el.email}</div>
                                            <div className='w-[120px] px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex justify-center'><IoMdEye size={18} className='cursor-pointer' onClick={() => navigate(`/data/view/${el.id}`)} /></div>
                                            <div className='w-[120px] px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex justify-center'><FaEdit size={18} className='cursor-pointer' onClick={() => navigate(`/data/edit/${el.id}`)} /></div>
                                            <div className='w-[120px] px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex justify-center relative'>
                                                <MdDeleteForever className='cursor-pointer' size={18} onClick={async () => {
                                                    setDeleteLoadingId(el.id)
                                                }
                                                } />
                                            </div>
                                        </div>
                                    </div>))}
                            </>
                        }
                    </div>



                    {items?.length == 0 &&
                        <div className='absolute inset-0 flex justify-center items-center pt-6'>
                            <h3 className='text-xl text-gray-400 text-center self-center'>No Data Found</h3>
                        </div>
                    }
                </div>
                <div className='flex gap-1 w-fit mx-auto'>
                    {page < maxPages && <button className='bg-green-500 text-white text-lg py-1 px-3' onClick={() => setPage(p => p + 1)}>+1</button>}
                    <p>{page}</p>
                    {page > 1 && <button className='bg-green-500 text-white text-lg py-1 px-3' onClick={() => setPage(p => p - 1)}>-1</button>}
                </div>
            </div>




        </>
    );
};

export default TableComponent;




