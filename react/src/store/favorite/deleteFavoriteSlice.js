import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const deleteFavoriteThunk = createAsyncThunk('deleteFavorite/deleteFavoriteThunk',
    async (id) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.delete(`${baseUrl}/Event/FavoriteEvent/${id}`)
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    });

const deleteFavoriteSlice = createSlice({
    name: "deleteFavorite",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteFavoriteThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
                window.location.reload();
            })
            .addCase(deleteFavoriteThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

export const selectData = state => state.deleteFavorite.data;
export const selectLoadingState = state => state.deleteFavorite.isLoading;
export const selectErrorState = state => state.deleteFavorite.hasError;

export default deleteFavoriteSlice.reducer;