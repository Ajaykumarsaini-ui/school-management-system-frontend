import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";

  
export const addAttendence = createAsyncThunk(
    "attendence/mark",
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("attendence/mark", formData);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const getAttendenceeverystudent = createAsyncThunk(
    "attendence/getAttendenceeverystudent",
    async (id , thunkAPI) => {
        try {
            const response = await axiosInstance.get(`attendence/student/${localStorage.getItem("userId")}`);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
)

export const fetchAttendanceByDate = createAsyncThunk(
  "attendanceByDate/fetch",
  async ({ classId, date }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/attendence/by-date", {
        params: { classId, date }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch attendance"
      );
    }
  }
);

export const studentAttendencestatus = createAsyncThunk(
  "studentAttendencestatus/studentAttendencestatus",
  async (studentId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/attendence/stats/student/${studentId}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
)

export const deleteAttendence = createAsyncThunk(
  "attendence/deleteAttendence",
  async (attendanceId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/attendence/${attendanceId}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);





