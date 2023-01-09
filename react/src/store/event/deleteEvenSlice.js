import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const deleteEventThunk = createAsyncThunk('deleteEvent/deleteEventThunk',
    async (id) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.delete(`${baseUrl}/event/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

const deleteSlice = createSlice({
    name: "deleteEvent",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteEventThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(deleteEventThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
                window.location.reload();
            })
            .addCase(deleteEventThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

// Selectors

export const selectData = state => state.deleteEvent.data;
export const selectLoadingState = state => state.deleteEvent.isLoading;
export const selectErrorState = state => state.deleteEvent.hasError;

export default deleteSlice.reducer;