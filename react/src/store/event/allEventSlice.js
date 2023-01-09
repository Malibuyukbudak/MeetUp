import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const allEventThunk = createAsyncThunk('allEvent/allEventThunk',
    async () => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.get(`${baseUrl}/event`)
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    });

const allEventSlice = createSlice({
    name: "allEvent",
    initialState: {
        allEventData: {},
        isLoadingAllEvent: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(allEventThunk.pending, (state, action) => {
                state.isLoadingAllEvent = true;
                state.hasError = false;
            })
            .addCase(allEventThunk.fulfilled, (state, action) => {
                state.allEventData = action.payload;
                state.isLoadingAllEvent = false;
                state.hasError = false
            })
            .addCase(allEventThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoadingAllEvent = false;
            })
    }
});

export const selectData = state => state.allEvent.allEventData;
export const selectLoadingState = state => state.allEvent.isLoadingAllEvent;
export const selectErrorState = state => state.allEvent.hasError;

export default allEventSlice.reducer;