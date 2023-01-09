import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";

export const registerThunk = createAsyncThunk('register/registerThunk',
    async (values) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.post(`${baseUrl}/user/register`, {
                "nameSurname": values.nameSurname,
                "username": values.username,
                "email": values.email,
                "telephone": values.telephone,
                "password": values.password
            })
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });
const registerSlice = createSlice({
    name: "register",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

export const selectData = state => state.register.data;
export const selectLoadingState = state => state.register.isLoading;
export const selectErrorState = state => state.register.hasError;

export default registerSlice.reducer;