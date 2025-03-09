import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import productReducer from './features/product/productSlice';
import categoryReducer from './features/category/categorySlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productReducer,
        categories: categoryReducer,
    },
});
