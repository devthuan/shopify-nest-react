import axios from './apiConfig';

export const fetchProducts = async (limit = 4) => {
    console.log(axios.defaults.baseURL);
    try {
        const response = await axios.get('products');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
