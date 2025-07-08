import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../apiservice/AxiosInstance";

export const addClass = createAsyncThunk(

    'api/class/addclass',
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/class/add', formData);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            thunkAPI.rejectWithValue(errorMsg);
        }
    }
)
export const getAllclasses = createAsyncThunk(
    'api/class/getAllclasses',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get('/class/all');
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const deleteClass = createAsyncThunk(
    'api/class/deleteClass',
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/class/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const updateClass = createAsyncThunk(
    'api/class/updateClass',
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/class/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

