import axios from './apiConfig';

export const login = async (data) => {
    try {
        const response = await axios.post(`auth/login`, {
            ...data,
        });
        return response.data;
    } catch (error) {
        console.error('Error login:', error);
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await axios.post(`auth/register`, {
            ...data,
        });
        return response;
    } catch (error) {
        console.error('Error register:', error);
        throw error;
    }
};

export const sendOTP = async (email) => {
    try {
        const response = await axios.post(`auth/send-otp`, {
            email: email,
        });
        return response;
    } catch (error) {
        console.error('Error send OTP:', error);
        throw error;
    }
};
