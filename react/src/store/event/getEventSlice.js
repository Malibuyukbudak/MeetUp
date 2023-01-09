import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const getEventThunk = createAsyncThunk('getEvent/getEventThunk',
    async (id) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.get(`${baseUrl}/event/${id}`)
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    });

const getEventSlice = createSlice({
    name: "getEvent",
    initialState: {
        data: {},
        isLoadingGetEvent: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEventThunk.pending, (state, action) => {
                state.isLoadingGetEvent = true;
                state.hasError = false;
            })
            .addCase(getEventThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoadingGetEvent = false;
                state.hasError = false
            })
            .addCase(getEventThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoadingGetEvent = false;
            })
    }
});

export const selectData = state => state.getEvent.data;
export const selectLoadingState = state => state.getEvent.isLoadingGetEvent;
export const selectErrorState = state => state.getEvent.hasError;

export default getEventSlice.reducer;