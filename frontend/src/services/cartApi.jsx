import axios from './apiConfig';

export const addProductToCart = async (variantId, quantity) => {
    try {
        const response = await axios.post(`carts`, {
            variantId,
            quantity,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
