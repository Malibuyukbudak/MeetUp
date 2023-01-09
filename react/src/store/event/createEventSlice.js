import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const createEventThunk = createAsyncThunk('createEvent/createEventThunk',
    async (values) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.post(`${baseUrl}/event`, {
                "title": values.title,
                "categoryId": values.categories,
                "capacity": values.capacity,
                "city": values.city,
                "state": values.state,
                "image": values.image,
                "created": values.date,
                "description": values.description
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

const categorySlice = createSlice({
    name: "createEvent",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEventThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(createEventThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
            })
            .addCase(createEventThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

// Selectors

export const selectData = state => state.createEvent.data;
export const selectLoadingState = state => state.createEvent.isLoading;
export const selectErrorState = state => state.createEvent.hasError;

export default categorySlice.reducer;