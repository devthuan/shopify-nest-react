import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductById, getProductByLimitAndPage } from '~/services/productApi';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ limit, page }, { rejectWithValue }) => {
        try {
            const data = await getProductByLimitAndPage(limit, page); // Gọi API từ service
            return data; // Trả về data cho Redux store
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Có lỗi xảy ra');
        }
    },
);

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id, { rejectWithValue }) => {
    try {
        const data = await getProductById(id); // Gọi API từ service
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Có lỗi xảy ra');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        totalPages: 1,
        selectedProduct: null,
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload.data; // Lưu danh sách sản phẩm
                state.totalPages = action.payload.totalPage;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default productSlice.reducer;
