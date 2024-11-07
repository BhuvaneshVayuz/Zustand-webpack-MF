import create from 'zustand';
import { axiosRequest } from '../util/userApiCalls';

const serverURL = `https://crud-task-vayuz-backend.vercel.app/user`;

const useUserStore = create((set) => ({
    user: null,
    status: 'idle',
    error: null,

    fetchUser: async () => {
        set({ status: 'loading' });
        try {
            const response = await axiosRequest('GET', serverURL);
            set({
                user: response.data.user,
                status: 'complete',
                error: null
            });
        } catch (error) {
            set({
                status: 'failed',
                error: error?.data
            });
        }
    },

    loginUser: async (data) => {
        try {
            const response = await axiosRequest('POST', `${serverURL}/login`, data);
            if (response.data) {
                set({ user: response.data.user });
            }
            return response
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    },

    loginOtpVerify: async (data) => {
        try {
            const response = await axiosRequest('POST', `${serverURL}/loginOTP`, data);
            set({ user: response.data.user });
            return response
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    },

    handle2FAchange: async (data) => {
        try {
            const response = await axiosRequest('POST', `${serverURL}/enableTwoFA`, data);
            set({ user: response.data });
            return response
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    },

    registerUser: async (data) => {
        try {
            const res = await axiosRequest('POST', `${serverURL}/register`, data);
            set({ user: null });
            return res
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    },

    registerOtpVerify: async (data) => {
        try {
            const res = await axiosRequest('POST', `${serverURL}/verifyRegister`, data);
            return res
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    },

    logoutUser: async () => {
        try {
            const res = await axiosRequest('POST', `${serverURL}/logout`);
            set({ user: null });
            return res
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    }
}));

export default useUserStore;
