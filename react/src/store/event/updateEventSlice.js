import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const updateEventThunk = createAsyncThunk('updateEvent/updateEventThunk',
    async ({ id, values }) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.put(`${baseUrl}/event/${id}`, {
                "title": values.title,
                "categoryId": values.categories,
                "capacity": values.capacity,
                "city": values.city,
                "state": values.state,
                "image": values.image,
                "created": values.date,
                "description": values.description
            })
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

const updateSlice = createSlice({
    name: "updateEvent",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateEventThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(updateEventThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
                window.location.reload();
            })
            .addCase(updateEventThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

// Selectors

export const selectData = state => state.updateEvent.data;
export const selectLoadingState = state => state.updateEvent.isLoading;
export const selectErrorState = state => state.deleteupdateEventEvent.hasError;

export default updateSlice.reducer;