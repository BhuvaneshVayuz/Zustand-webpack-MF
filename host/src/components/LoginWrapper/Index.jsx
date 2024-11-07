import React, { lazy, Suspense } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = lazy(() => import('LoginApp/Login'));

const LoginWrapper = () => {
    const navigate = useNavigate();

    return (
        <div className='relative p-10 h-[90%]'>
            <Suspense fallback={<h1>Loading Login Component...</h1>}>
                <Login navigate={navigate} useSearchParams={useSearchParams} />
            </Suspense>
        </div>
    );
};

export default LoginWrapper;
