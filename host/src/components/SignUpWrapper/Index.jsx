import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = lazy(() => import('LoginApp/SignUp'));

const SignUpWrapper = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Sign Up</h1>
            <Suspense fallback={<div>Loading SignUp...</div>}>
                <SignUp navigate={navigate} />
            </Suspense>
        </div>
    );
};

export default SignUpWrapper;
