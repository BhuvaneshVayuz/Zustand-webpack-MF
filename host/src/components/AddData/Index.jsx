import React, { lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddDataElement = lazy(() => import('addData/addData'));

const AddDataWrapper = () => {
    const navigate = useNavigate();

    return (
        <div className='relative px-5 py-10'>
            <Link to={'/data'} className='text-blue-300 absolute top-2 left-2 text-2xl font-bold' relative={true}>
                {`<--`}
            </Link>
            <Suspense fallback={<div>Loading Add Data Element...</div>}>
                <AddDataElement navigate={navigate} />
            </Suspense>
        </div>
    );
};

export default AddDataWrapper;
