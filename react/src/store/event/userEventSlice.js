import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const userEventThunk = createAsyncThunk('userEvent/userEventThunk',
    async () => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.get(`${baseUrl}/event/user/data`)
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    });

const userEventSlice = createSlice({
    name: "userEvent",
    initialState: {
        userEventData: {},
        isLoadingUser: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(userEventThunk.pending, (state, action) => {
                state.isLoadingUser = true;
                state.hasError = false;
            })
            .addCase(userEventThunk.fulfilled, (state, action) => {
                state.userEventData = action.payload;
                state.isLoadingUser = false;
                state.hasError = false
            })
            .addCase(userEventThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoadingUser = false;
            })
    }
});

// Selectors

export const selectData = state => state.userEvent.userEventData;
export const selectLoadingState = state => state.userEvent.isLoadingUser;
export const selectErrorState = state => state.userEvent.hasError;

export default userEventSlice.reducer;