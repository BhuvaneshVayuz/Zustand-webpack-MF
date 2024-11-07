import React, { lazy, Suspense, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TableComponent = lazy(() => import('dataTable/TableComponent'));

const DataPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

    const addedObj = {
        'week': 7,
        'month': 30,
        'year': 360,
        'day': 1,
        7: 'week',
        30: 'month',
        360: 'year',
        1: 'day',
    };

    function handleSorting(value) {
        if (addedObj[value]) {
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), added: addedObj[value], page: 1 });
        } else {
            let temp = { ...Object.fromEntries(searchParams.entries()) };
            delete temp.added;
            setSearchParams(temp);
        }
    }

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: value, page: 1 });
    };

    const handleLimitChange = (e) => {
        const value = e.target.value;
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), limit: value, page: 1 });
    };

    const handleSearch = () => {
        if (searchValue) {
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), search: searchValue });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div className='flex justify-center items-center flex-col min-h-[90%] gap-16 p-10'>
            <button className='block mx-auto text-2xl bg-blue-700 text-white px-8 py-3 rounded-lg' onClick={() => navigate('/data/add')}>Add Data</button>
            <div className='flex gap-5'>
                <div className='relative flex gap-4 sm:mb-0'>
                    <div className='relative'>
                        <input
                            className='border max-w-[300px] sm:w-[400px] px-3 pr-7 py-2'
                            type="text"
                            name="search"
                            id="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {/* Close icon to clear all filters and search box */}
                        {searchValue?.length > 0 && (
                            <button
                                onClick={() => {
                                    setSearchValue('');
                                    setSearchParams({});
                                }}
                                className='absolute cursor-pointer bottom-[9px] right-2'
                            >
                                X
                            </button>
                        )}
                    </div>
                    <button className='px-4 py-2 bg-green-700 text-white rounded-md' onClick={handleSearch}>Search</button>
                </div>

                <select
                    className='border w-[100px] sm:w-[150px] px-2 sm:px-3 py-2'
                    value={addedObj[`${searchParams.get('added')}`] || ''}
                    onChange={(e) => handleSorting(e.target.value)}
                >
                    <option value=''>Added</option>
                    <option value='day'>Today</option>
                    <option value='week'>Last Week</option>
                    <option value='month'>Last Month</option>
                    <option value='year'>Last Year</option>
                </select>

                <select
                    className='border w-[100px] sm:w-[150px] px-2 sm:px-3 py-2'
                    onChange={handleSortChange}
                    value={searchParams.get('sort') || ''}
                >
                    <option value=''>Sort</option>
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                </select>
                <select
                    className='border w-[110px] sm:w-[150px] px-2 sm:px-3 py-2'
                    onChange={handleLimitChange}
                    value={searchParams.get('limit') || ''}
                >
                    <option value=''>Data Rows</option>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                </select>
            </div>

            <Suspense fallback={<div>Loading Data Table...</div>}>
                <TableComponent
                    navigate={navigate}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
            </Suspense>
        </div>
    );
};

export default DataPage;
