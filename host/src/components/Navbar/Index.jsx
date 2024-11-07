import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { logoutUser, handle2FAchange } from 'reduxApp/userSlice'
import useUserStore from 'zustand/userStore'

const Navbar = ({ twoFAini }) => {
    const dispatch = useDispatch()
    const { logoutUser, handle2FAchange } = useUserStore()
    const navigate = useNavigate()

    async function handleSignOut() {
        // await dispatch(logoutUser())
        await logoutUser()
        navigate('/login')
    }

    return (
        <div className='flex justify-between bg-slate-800 text-white px-6 py-3'>
            <h1 className='text-3xl'>App layout</h1>
            <div className='flex gap-8 items-center'>
                <label className="flex flex-col items-center cursor-pointer gap-0 justify-center">
                    <span className="text-lg font-medium text-white text-start">2FA</span>
                    <input type="checkbox"
                        name="active"
                        id="active"
                        checked={twoFAini}
                        onChange={async (e) => {
                            // await dispatch(handle2FAchange({ twoFA: e.target.checked }))
                            await handle2FAchange({ twoFA: e.target.checked })
                        }}
                        className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <Link to='/' className='text-blue-300 text-lg'>Home</Link>
                <Link to='/data' className='text-blue-300 text-lg'>Data Page</Link>
                <button onClick={handleSignOut} className={'text-red-600 text-lg'}>Sign out</button>
            </div>
        </div>
    )
}

export default Navbar