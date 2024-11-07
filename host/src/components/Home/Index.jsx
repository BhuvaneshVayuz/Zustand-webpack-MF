import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center h-[90%] bg-gray-100'>
            <div className='flex flex-col w-1/2 items-center gap-16 bg-white px-6 py-10 rounded-lg drop-shadow-lg'>
                <h1 className='text-6xl text-center'>Look at ya Look at ya Look at ya</h1>
                <div className='flex gap-5'>
                    <button onClick={() => navigate('/data')} className='text-2xl rounded-lg bg-green-600 text-white px-5 py-3'>Get started</button>
                    {/* <button onClick={() => navigate('/register')} className='text-2xl rounded-lg bg-green-600 text-white px-5 py-3'>Sign Up</button> */}
                </div>
            </div>
        </div>
    )
}

export default Home