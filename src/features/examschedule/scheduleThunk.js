import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";


export const registerSchedule = createAsyncThunk(
    "schedule/add" ,
        async (data, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/examschedule/add", data);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getAllSchedule = createAsyncThunk(
    "schedule/getAllSchedule",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/examschedule/all");
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const deleteSchedule = createAsyncThunk(
    "schedule/deleteSchedule",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`/examschedule/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)