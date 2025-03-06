import axios from './apiConfig';

export const getProductsInCartWithLimitAndPage = async (limit = 10, page = 1) => {
    try {
        const response = await axios.get(`carts`, {
            params: {
                limit,
                page,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const addProductToCart = async (variantId, quantity) => {
    try {
        const response = await axios.post(`carts`, {
            variantId,
            quantity,
        });
        return response;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const increaseQuantityInCart = async (cartId, variantId, quantity = 1) => {
    try {
        const response = await axios.patch(`carts/increase/${cartId}`, {
            variantId,
            quantity,
        });
        return response;
    } catch (error) {
        console.error('Error increase item in cart:', error);
        throw error;
    }
};

export const decreaseQuantityInCart = async (cartId, variantId, quantity) => {
    try {
        const response = await axios.patch(`carts/decrease/${cartId}`, {
            variantId,
            quantity,
        });
        return response;
    } catch (error) {
        console.error('Error decrease item in cart:', error);
        throw error;
    }
};
