import axios from 'axios';
import { getItemWithExpiration } from './localStorage';

const api = axios.create({
    // baseURL: "http://103.69.96.11:1111/api/v1",
    baseURL: 'http://localhost:8080/api/v1',

    timeout: 5000, // Đặt timeout tùy ý
});

api.interceptors.request.use(
    async (config) => {
        // lấy token strong localStorage
        const token = getItemWithExpiration('token') || null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
export default api;
