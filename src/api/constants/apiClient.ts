/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, Method } from 'axios';

const apiClient = axios.create();

export const apiRequest = async (
    method: Method,
    url: string,
    port: number, // new parameter for the port number
    data?: any,
    headers: any = {}
) => {
    // const token = store.getState().auth.accessToken;

    // if (token) {
    //     headers.Authorization = `Bearer ${token}`;
    // }

    console.log(port)
    const config: AxiosRequestConfig = {
        method,
        url, // use the port number here
         //baseURL: `http://3.10.176.181:${port}`, // set baseURL here dynamically
        baseURL: 'https://app.operationstacked.com/workout/',
        data,
        headers,
    };
    try {
        const response = await apiClient(config);
        return response.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};
