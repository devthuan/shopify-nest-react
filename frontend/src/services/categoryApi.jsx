import axios from './apiConfig';

export const getCategoryByLimitAndPage = async (limit = 6, page = 1) => {
    try {
        const response = await axios.get('categories', {
            params: {
                limit,
                page,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
