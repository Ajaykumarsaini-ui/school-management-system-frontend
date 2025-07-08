import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../apiservice/AxiosInstance";

export const loginteacher = createAsyncThunk(
  "/teacher/login",
  async (Logindata, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/teacher/login", Logindata);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTeacher = createAsyncThunk(
  "teacher/getTeacher",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/teacher/${localStorage.getItem("userId")}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teacher/updateTeacher",

  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/teacher/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teacher/deleteTeacher",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/teacher/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const registerTeacher = createAsyncThunk(
  "/teacher/add",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/teacher/add", formData);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllteachers = createAsyncThunk(
  "teacher/getAllteachers",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/teacher/all");
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);


export const getAssignedclassesandstudents = createAsyncThunk(
  "teacher/getAssignedclassesandstudents",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/teacher/classassignedstudent`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);