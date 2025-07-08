import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";


export const getstudentleave = createAsyncThunk(
  "studentleave/getstudentleave",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/studentleave/all`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// ✅ 2. Update leave status (Approve / Reject)
export const updatestudentleave = createAsyncThunk(
  "studentleave/updatestudentleave",
  async ({ id, leaveStatus }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/studentleave/${id}`, { leaveStatus });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// ✅ 3. Delete a leave request
export const deletestudentleave = createAsyncThunk(
  "studentleave/deletestudentleave",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/studentleave/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// ✅ 4. Register (create) a new leave request
export const registerstudentleave = createAsyncThunk(
  "studentleave/registerstudentleave",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/studentleave/add", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Request failed");
    }
  }
);


export const getstudentleaveById = createAsyncThunk(
    "studentleave/getstudentleaveById",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/studentleave/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);