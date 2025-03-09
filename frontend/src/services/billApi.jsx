import axios from './apiConfig';

export const createNewBill = async (data) => {
    try {
        const response = await axios.post(`bills`, {
            ...data,
        });
        return response.data;
    } catch (error) {
        console.error('Error create bill:', error);
        throw error;
    }
};
