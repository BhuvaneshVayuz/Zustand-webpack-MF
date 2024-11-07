import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { axiosRequest } from "../util/userApiCalls";

const serverURL = `https://crud-task-vayuz-backend.vercel.app/user`;

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
    try {
        return await axiosRequest('GET', serverURL);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async (data, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', `${serverURL}/login`, data);
    } catch (error) {
        return rejectWithValue(error);
    }
});
export const loginOtpVerify = createAsyncThunk('user/loginOtpVerify', async (data, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', `${serverURL}/loginOTP`, data);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const handle2FAchange = createAsyncThunk('user/handle2FAchange', async (data, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', `${serverURL}/enableTwoFA`, data);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const registerUser = createAsyncThunk('user/registerUser', async (data, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', `${serverURL}/register`, data);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const registerOtpVerify = createAsyncThunk('user/registerOtpVerify', async (data, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', `${serverURL}/verifyRegister`, data);
    } catch (error) {
        return rejectWithValue(error);
    }
});



export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
    try {
        return await axiosRequest('POST', `${serverURL}/logout`);
    } catch (error) {
        return rejectWithValue(error);
    }
});




const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'complete'
                state.user = action.payload.data.user
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.data
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.data) {
                    state.user = action.payload.data.user
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload.data
            })
            .addCase(loginOtpVerify.fulfilled, (state, action) => {
                state.user = action.payload.data.user
            })
            .addCase(loginOtpVerify.rejected, (state, action) => {
                state.error = action.payload.data
            })
            .addCase(handle2FAchange.fulfilled, (state, action) => {
                state.user = action.payload.data
            })
            .addCase(handle2FAchange.rejected, (state, action) => {
                state.error = action.payload.data
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload.data
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload.data
            })

    }
})

export const getUser = () => {
    return useSelector(state => state.user.user)
}
export const getUserStatus = () => {
    return useSelector(state => state.user.status)
}
export const getUserError = () => {
    return useSelector(state => state.user.error)
}


export default userSlice.reducer