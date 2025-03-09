import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoryByLimitAndPage } from '~/services/categoryApi';

// Async Thunk để gọi API lấy danh mục sản phẩm
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async ({ limit, page }, { rejectWithValue }) => {
        try {
            const data = await getCategoryByLimitAndPage(limit, page);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Lỗi khi lấy danh mục');
        }
    },
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
                state.totalPages = action.payload.totalPage;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;
