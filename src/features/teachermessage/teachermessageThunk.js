import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";


export const getteachermessage = createAsyncThunk(
    "teachermessage/getteachermessage",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/teachermessage/all/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const deleteteachermessage = createAsyncThunk(
    "teachermessage/deleteteachermessage",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/teachermessage/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const getAllteachermessage = createAsyncThunk(
    "teachermessage/getAllteachermessage",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/teachermessage/all");
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const addteachermessage = createAsyncThunk(
    "teachermessage/addteachermessage",
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/teachermessage/add", formData);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

