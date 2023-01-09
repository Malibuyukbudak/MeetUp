import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const userJoinedEventThunk = createAsyncThunk('userJoinedEvent/userJoinedEventThunk',
    async () => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.get(`${baseUrl}/event/user/JoinedEvent`)
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    });

const userJoinedEventSlice = createSlice({
    name: "userJoinedEvent",
    initialState: {
        userJoinedEventData: {},
        isLoadingUserJoined: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(userJoinedEventThunk.pending, (state, action) => {
                state.isLoadingUserJoined = true;
                state.hasError = false;
            })
            .addCase(userJoinedEventThunk.fulfilled, (state, action) => {
                state.userJoinedEventData = action.payload;
                state.isLoadingUserJoined = false;
                state.hasError = false
            })
            .addCase(userJoinedEventThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoadingUserJoined = false;
            })
    }
});

// Selectors

export const selectData = state => state.userJoinedEvent.userJoinedEventData;
export const selectLoadingState = state => state.userJoinedEvent.isLoadingUserJoined;
export const selectErrorState = state => state.userJoinedEvent.hasError;

export default userJoinedEventSlice.reducer;