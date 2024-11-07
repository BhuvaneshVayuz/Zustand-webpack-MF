import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { getDataWithId } from 'reduxApp/dataSlice';
import useDataStore from 'zustand/dataStore'

const DataViewComponent = lazy(() => import('dataView/DataView'));

const DataViewWrapper = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    // const dispatch = useDispatch();
    const { fetchDataWithId: getDataWithId } = useDataStore()
    useEffect(() => {
        const fetch = async () => {
            // await dispatch(getDataWithId(id));
            await getDataWithId(id);
            setLoading(false);
        };
        fetch();
    }, [id]);

    return (
        <div className='min-h-[90%] p-10 relative'>
            <Link to={'/data'} className='text-blue-300 absolute top-2 left-2 text-2xl font-bold' relative={true}>
                {`<--`}
            </Link>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <Suspense fallback={<h1>Loading Data View...</h1>}>
                    <DataViewComponent />
                </Suspense>
            )}
        </div>
    );
};

export default DataViewWrapper;
