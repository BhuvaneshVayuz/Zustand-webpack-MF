import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'reduxApp/userSlice'; // Make sure to import fetchUser from the correct path
import useUserStore from 'zustand/userStore'
const Navbar = lazy(() => import('./components/Navbar/Index'));
const Loading = lazy(() => import('dataTable/Loading'));

const Main = () => {
    const [loading, setLoading] = useState(true);
    // const user = useSelector(state => state.user.user);
    const { user, fetchUser } = useUserStore()
    // const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            // await dispatch(fetchUser());
            await fetchUser()
            setLoading(false);
        };
        fetch();
    }, []);

    return (
        <Suspense fallback={<div className='fixed inset-0 flex justify-center items-center'><Loading /></div>}>
            {loading ?
                <div className='fixed inset-0 flex justify-center items-center'>
                    <Loading />
                </div>
                :
                user ?
                    <div className='h-full'>
                        <Navbar twoFAini={user.twoFA} />
                        <Outlet />
                    </div>
                    :
                    <Navigate to={'/login'} />
            }
        </Suspense>
    );
};

export default Main;
