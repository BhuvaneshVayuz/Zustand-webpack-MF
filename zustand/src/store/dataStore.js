import { create } from 'zustand';
import { axiosRequest } from '../util/userApiCalls';

const serverURL = `https://crud-task-vayuz-backend.vercel.app/data`;

const useDataStore = create((set) => ({
    data: null,
    dataLength: 0,
    status: 'idle',
    dataId: null,
    error: null,

    fetchData: async ({ searchQuery, page, limit, added, sort }) => {
        set({ status: 'loading' });
        try {
            const url = `${serverURL}?search=${searchQuery}&page=${page}&limit=${limit}&added=${added}&sort=${sort}`;
            const response = await axiosRequest('GET', url);
            set({
                data: response.data.data,
                dataLength: parseInt(response.data.dataLength),
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

    fetchDataWithId: async (id) => {
        try {
            const url = `${serverURL}/${id}`;
            const response = await axiosRequest('GET', url);
            set({ dataId: response.data });
        } catch (error) {
            set({ error: error?.data });
        }
    },

    addData: async (data) => {
        try {
            const response = await axiosRequest('POST', serverURL, data);
            set((state) => ({
                data: state.data ? [response.data, ...state.data] : [response.data],
            }));
            return response
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    },

    editData: async ({ id, data }) => {
        try {
            const url = `${serverURL}/${id}`;
            const response = await axiosRequest('PUT', url, data);
            set((state) => ({
                data: state.data?.map(el => el.id === id ? response.data : el),
            }));
            return response
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    },

    deleteData: async (id) => {
        try {
            const url = `${serverURL}/${id}`;
            const res = await axiosRequest('DELETE', url);
            set((state) => ({
                data: state.data.filter(el => el.id !== id),
                dataLength: state.dataLength - 1
            }));
            return res
        } catch (error) {
            set({ error: error?.data });
            return error
        }
    }
}));

export default useDataStore;
