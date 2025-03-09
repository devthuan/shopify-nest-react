import axios from './apiConfig';

// Todo: Muốn lấy ra tất cả voucher để xét, hoặc kiếm voucher theo tên
export const getVouchersLimitAndPage = async (limit = 10, page = 1) => {
    try {
        const response = await axios.get(`vouchers`, {
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

export const getAndCheckVoucherByCode = async (code) => {
    try {
        const response = await axios.get(`vouchers/check/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};
