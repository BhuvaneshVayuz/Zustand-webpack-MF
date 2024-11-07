import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <h1 className='text-2xl'>
                Route Not Found
            </h1>
            <Link to={'/'} className='text-blue-300 text-lg underline'>Idiot</Link>
        </div>
    )
}

export default NotFound