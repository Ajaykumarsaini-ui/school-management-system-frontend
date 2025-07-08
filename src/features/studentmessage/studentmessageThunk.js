import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";


export const getstudentmessage = createAsyncThunk(
    "studentmessage/getstudentmessage",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/studentmessage/all/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const deletestudentmessage = createAsyncThunk(
    "studentmessage/deletestudentmessage",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/studentmessage/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const getAllstudentmessage = createAsyncThunk(
    "studentmessage/getAllstudentmessage",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/studentmessage/all");
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const addstudentmessage = createAsyncThunk(
    "studentmessage/addstudentmessage",
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/studentmessage/add", formData);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

