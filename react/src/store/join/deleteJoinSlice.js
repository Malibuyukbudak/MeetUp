import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const deleteJoinThunk = createAsyncThunk('deleteFavorite/deleteFavoriteThunk',
    async (id) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.delete(`${baseUrl}/Event/JoinedEvent/${id}`)
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    });

const deleteJoinSlice = createSlice({
    name: "deleteJoin",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteJoinThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(deleteJoinThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
                window.location.reload();
            })
            .addCase(deleteJoinThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

export const selectData = state => state.deleteJoin.data;
export const selectLoadingState = state => state.deleteJoin.isLoading;
export const selectErrorState = state => state.deleteJoin.hasError;

export default deleteJoinSlice.reducer;