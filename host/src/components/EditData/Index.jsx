import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { getDataWithId } from 'reduxApp/dataSlice';
import useDataStore from 'zustand/dataStore'


const EditDataComponent = lazy(() => import('dataView/DataEdit'));

const EditDataWrapper = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    // const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className='min-h-[90%] p-10'>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <Suspense fallback={<h1>Loading Edit Data Component...</h1>}>
                    <EditDataComponent navigate={navigate} />
                </Suspense>
            )}
        </div>
    );
};

export default EditDataWrapper;
