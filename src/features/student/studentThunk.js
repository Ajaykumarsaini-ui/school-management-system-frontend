import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";

export const loginstudent = createAsyncThunk(
  "/student/login",
  async (Logindata, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/student/login", Logindata);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getStudent = createAsyncThunk(
  "student/getStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/student/${localStorage.getItem("userId")}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const getSinglestudent = createAsyncThunk(
  "student/getSinglestudent",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/student/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/student/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/student/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const registerStudent = createAsyncThunk(
  "student/registerStudent", // ✅ better to use consistent naming
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/student/add", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to register student"
      );
    }
  }
);

export const getAllstudents = createAsyncThunk(
  "student/getAllstudents",
  async ({ page = 1, limit = 2 }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/student/all?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const studentSubjects = createAsyncThunk(
  "student/studentSubjects",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/studentsubject/${localStorage.getItem("userId")}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);
