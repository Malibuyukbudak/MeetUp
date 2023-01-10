import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

export const loginThunk = createAsyncThunk('login/loginThunk',
    async (values) => {
        try {
            const baseUrl = apiClient.defaults.baseURL
            const response = await apiClient.post(`${baseUrl}/user/login`, {
                "UsernameOrEmail": values.email,
                "Password": values.password
            })
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });
const loginSlice = createSlice({
    name: "login",
    initialState: {
        data: {},
        isLoading: true,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                if(action.payload.isSuccess){
                    localStorage.setItem('token', JSON.stringify(action.payload.data.accessToken));
                }
                //const navigate = useNavigate();
                //navigate('/');
                state.data = action.payload;
                state.isLoading = false;
                state.hasError = false
                action.payload.isSuccess?toast.success("Success"):toast.error("Please check username or password")
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.hasError = true
                state.isLoading = false;
            })
    }
});

export const selectData = state => state.login.data;
export const selectLoadingState = state => state.login.isLoading;
export const selectErrorState = state => state.login.hasError;

export default loginSlice.reducer;