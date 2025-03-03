import axios from './apiConfig';

export const getProductByLimitAndPage = async (limit = 4, page = 1) => {
    // console.log(axios.defaults.baseURL);
    try {
        const response = await axios.get('products', {
            params: {
                limit,
                page,
            },
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
