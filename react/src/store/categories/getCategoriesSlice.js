import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const getCategoriesThunk = createAsyncThunk('getCategories/getCategoriesThunk',
    async () => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.get(`${baseUrl}/categories`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

const categorySlice = createSlice({
    name: "getCategories",
    initialState: {
        categoryData: {},
        isLoadingCategory: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesThunk.pending, (state, action) => {
                state.isLoadingCategory = true;
                state.hasError = false;
            })
            .addCase(getCategoriesThunk.fulfilled, (state, action) => {
                state.categoryData = action.payload;
                state.isLoadingCategory = false;
                state.hasError = false
            })
            .addCase(getCategoriesThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoadingCategory = false;
            })
    }
});

export const selectData = state => state.getCategories.category;
export const selectLoadingState = state => state.getCategories.isLoadingCategory;
export const selectErrorState = state => state.getCategories.hasError;

export default categorySlice.reducer;