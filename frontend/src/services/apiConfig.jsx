import axios from 'axios';
import { getItemWithExpiration } from './localStorage';

const api = axios.create({
    baseURL: 'http://178.128.24.181:8080/api/v1/',
    // baseURL: 'http://localhost:8080/api/v1',

    // timeout: 5000, // Đặt timeout tùy ý
});

api.interceptors.request.use(
    async (config) => {
        const accessToken = getItemWithExpiration('accessToken') || null;

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
    async (config) => {
        // lấy accessToken strong localStorage
        const accessToken = getItemWithExpiration('accessToken') || null;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
export default api;
