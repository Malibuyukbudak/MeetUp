import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const userFavoriteEventThunk = createAsyncThunk('userFavoriteEvent/userFavoriteEventThunk',
    async () => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.get(`${baseUrl}/event/user/FavoriteEvent`)
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    });

const userFavoriteEventSlice = createSlice({
    name: "userFavoriteEvent",
    initialState: {
        userFavoriteEventData: {},
        isLoadingUserFavorite: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(userFavoriteEventThunk.pending, (state, action) => {
                state.isLoadingUserFavorite = true;
                state.hasError = false;
            })
            .addCase(userFavoriteEventThunk.fulfilled, (state, action) => {
                state.userFavoriteEventData = action.payload;
                state.isLoadingUserFavorite = false;
                state.hasError = false
            })
            .addCase(userFavoriteEventThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoadingUserFavorite = false;
            })
    }
});

// Selectors

export const selectData = state => state.userFavoriteEvent.userFavoriteEventData;
export const selectLoadingState = state => state.userFavoriteEvent.isLoadingUserFavorite;
export const selectErrorState = state => state.userFavoriteEvent.hasError;

export default userFavoriteEventSlice.reducer;