import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";


export const getteacherleave = createAsyncThunk(
  "teacherleave/getteacherleave",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/teacherleave/all`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// ✅ 2. Update leave status (Approve / Reject)
export const updateteacherleave = createAsyncThunk(
  "teacherleave/updateteacherleave",
  async ({ id, leaveStatus }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/teacherleave/${id}`, { leaveStatus });
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// ✅ 3. Delete a leave request
export const deleteteacherleave = createAsyncThunk(
  "teacherleave/deleteteacherleave",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/teacherleave/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// ✅ 4. Register (create) a new leave request
export const registerteacherleave = createAsyncThunk(
  "teacherleave/registerteacherleave",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/teacherleave/add", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Request failed");
    }
  }
);


export const getteacherleaveById = createAsyncThunk(
    "teacherleave/getteacherleaveById",
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/teacherleave/${id}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);