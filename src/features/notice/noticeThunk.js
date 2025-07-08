import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";


export const getNotice = createAsyncThunk(
    "notice/getNotice",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/notice/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const updateNotice = createAsyncThunk(
    "notice/updateNotice",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/notice/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const deleteNotice = createAsyncThunk(
    "notice/deleteNotice",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/notice/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const getAllnotices = createAsyncThunk(
    "notice/getAllnotices",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/notice/all");
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const registerNotice = createAsyncThunk(
    "/notice/add",
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/notice/add", formData);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



