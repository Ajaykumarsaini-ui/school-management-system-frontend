import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../apiservice/AxiosInstance";

export const getAllsubjects = createAsyncThunk(
    "subject/getAllsubjects",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/subject/all");
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const getSubject = createAsyncThunk(
    "subject/getSubject",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/subject/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);


export const deleteSubject = createAsyncThunk(
    "subject/deleteSubject",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/subject/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);


export const updateSubject = createAsyncThunk(
    "subject/updateSubject",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/subject/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);  

export const registerSubject = createAsyncThunk(
    "/subject/add",
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/subject/add", formData);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
);