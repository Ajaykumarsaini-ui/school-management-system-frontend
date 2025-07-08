import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../apiservice/AxiosInstance";
import axios from "axios";

export const registerschool = createAsyncThunk(
  "/school/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/school/register", formData);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginschool = createAsyncThunk(
  "/school/login",
  async (Logindata, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/school/login" , Logindata);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getSchool = createAsyncThunk(
  "school/getSchool",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/school/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);


export const updateSchool = createAsyncThunk(
  "school/updateSchool",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/school/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const deleteSchool = createAsyncThunk(
  "school/deleteSchool",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/school/${id}`);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const getAllschools = createAsyncThunk(
  "school/getAllschools",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/school/all");
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);




