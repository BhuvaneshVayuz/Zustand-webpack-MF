import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { axiosRequest } from "../util/userApiCalls";

const serverURL = `https://crud-task-vayuz-backend.vercel.app/data`;

export const getData = createAsyncThunk('data/getData', async ({ searchQuery, page, limit, added, sort }, { rejectWithValue }) => {
    try {
        const url = `${serverURL}?search=${searchQuery}&page=${page}&limit=${limit}&added=${added}&sort=${sort}`;
        return await axiosRequest('GET', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});




export const getDataWithId = createAsyncThunk('data/getDataWithId', async (id, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('GET', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addData = createAsyncThunk('data/addData', async (data, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', serverURL, data);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const editData = createAsyncThunk('data/editData', async ({ id, data }, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('PUT', url, data);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const deleteData = createAsyncThunk('data/deleteData', async (id, { rejectWithValue }) => {
    try {
        const url = `${serverURL}/${id}`;
        return await axiosRequest('DELETE', url);
    } catch (error) {
        return rejectWithValue(error);
    }
});







const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: null,
        dataLength: 0,
        status: 'idle',
        dataId: null,
        error: null
    },
    extraReducers(builder) {
        builder
            .addCase(getData.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.status = 'complete'
                state.data = action.payload.data.data
                state.dataLength = parseInt(action.payload.data.dataLength)
            })
            .addCase(getData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload?.data
            })
            .addCase(getDataWithId.fulfilled, (state, action) => {
                state.dataId = action.payload.data
            })
            .addCase(getDataWithId.rejected, (state, action) => {
                state.error = action.payload.data
            })
            .addCase(addData.fulfilled, (state, action) => {
                if (state.data?.length > 0) {
                    state.data.unshift(action.payload.data)
                }
            })
            .addCase(addData.rejected, (state, action) => {
                state.error = action.payload.data
            })
            .addCase(editData.fulfilled, (state, action) => {
                if (state.data?.length > 0) {
                    state.data = state.data.map(el => {
                        if (el.id == action.payload.data.id) {
                            return action.payload.data
                        } else {
                            return el
                        }
                    })
                }
            })
            .addCase(editData.rejected, (state, action) => {
                state.error = action.payload.data
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.data = state.data.filter(el => el.id != action.payload.data.id)
                state.dataLength = parseInt(state.dataLength) - 1
            })
            .addCase(deleteData.rejected, (state, action) => {
                state.error = action.payload.data
            })

    }
})


export const getDataSelector = () => {
    return useSelector(state => state.data.data)
}
export const getDataLengthSelector = () => {
    return useSelector(state => state.data.dataLength)
}
export const getDataWithIdLocal = (id) => {
    return useSelector(state => {
        let res = state.data.data.filter(el => el.id == id)
        return res[0]
    })
}

export const getDataWithIdSelector = () => {
    return useSelector(state => state.data.dataId)
}
export const getDataStatus = () => {
    return useSelector(state => state.data.status)
}
export const getDataError = () => {
    return useSelector(state => state.data.error)
}

export default dataSlice.reducer