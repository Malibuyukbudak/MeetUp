import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const createJoinThunk = createAsyncThunk('createJoin/createJoinThunk',
    async (id) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.post(`${baseUrl}/event/Join`, {
                "eventId": id
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

const createJoinSlice = createSlice({
    name: "createJoin",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJoinThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(createJoinThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
                window.location.reload();
            })
            .addCase(createJoinThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

export const selectData = state => state.createJoin.data;
export const selectLoadingState = state => state.createJoin.isLoading;
export const selectErrorState = state => state.createJoin.hasError;

export default createJoinSlice.reducer;