import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const profileThunk = createAsyncThunk('profile/profileThunk',
    async () => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.get(`${baseUrl}/user`)
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    });

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(profileThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(profileThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
            })
            .addCase(profileThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

// Selectors

export const selectData = state => state.profile.data;
export const selectLoadingState = state => state.profile.isLoading;
export const selectErrorState = state => state.profile.hasError;

export default profileSlice.reducer;