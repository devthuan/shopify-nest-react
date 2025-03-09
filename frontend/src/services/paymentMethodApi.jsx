import axios from './apiConfig';

export const getPaymentMethodByLimitAndPage = async (limit = 10, page = 1) => {
    try {
        const response = await axios.get('payments', {
            params: {
                limit,
                page,
            },
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching payment method:', error);
        throw error;
    }
};
