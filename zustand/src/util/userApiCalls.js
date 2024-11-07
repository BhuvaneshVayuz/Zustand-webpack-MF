import axios from "axios"


export const axiosRequest = async (method, url, data = null) => {
    try {
        const config = {
            method,
            url,
            withCredentials: true,
            data
        };
        axios.defaults.withCredentials = true
        const response = await axios(config);
        console.log(response, 'response');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};