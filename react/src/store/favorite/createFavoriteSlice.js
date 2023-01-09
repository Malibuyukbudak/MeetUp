import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const createFavoriteThunk = createAsyncThunk('createFavorite/createFavoriteThunk',
    async (id) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.post(`${baseUrl}/event/favorite`, {
                "eventId": id
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

const createFavoriteSlice = createSlice({
    name: "createFavorite",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFavoriteThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(createFavoriteThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
                window.location.reload();
            })
            .addCase(createFavoriteThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

export const selectData = state => state.createFavorite.data;
export const selectLoadingState = state => state.createFavorite.isLoading;
export const selectErrorState = state => state.createFavorite.hasError;

export default createFavoriteSlice.reducer;