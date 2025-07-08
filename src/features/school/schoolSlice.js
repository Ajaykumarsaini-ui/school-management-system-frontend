import { createSlice } from "@reduxjs/toolkit";
import {
  loginschool,
  registerschool,
  getSchool,
  updateSchool,
  deleteSchool,
  getAllschools,
} from "./schoolThunk";

const initialState = {
  school: null,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.school = action.payload;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error =
    action.payload || action.error?.message || "Something went wrong";
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register School
      .addCase(registerschool.pending, handlePending)
      .addCase(registerschool.fulfilled, handleFulfilled)
      .addCase(registerschool.rejected, handleRejected)

      // Login School
      .addCase(loginschool.pending, handlePending)
      .addCase(loginschool.fulfilled, handleFulfilled)
      .addCase(loginschool.rejected, handleRejected)

      // Get School
      .addCase(getSchool.pending, handlePending)
      .addCase(getSchool.fulfilled, handleFulfilled)
      .addCase(getSchool.rejected, handleRejected)

      // Update School
      .addCase(updateSchool.pending, handlePending)
      .addCase(updateSchool.fulfilled, handleFulfilled)
      .addCase(updateSchool.rejected, handleRejected)

      // Delete School
      .addCase(deleteSchool.pending, handlePending)
      .addCase(deleteSchool.fulfilled, handleFulfilled)
      .addCase(deleteSchool.rejected, handleRejected)

      // Get All Schools

      .addCase(getAllschools.pending, handlePending)
      .addCase(getAllschools.fulfilled, handleFulfilled)
      .addCase(getAllschools.rejected, handleRejected);
  },
});

export default schoolSlice.reducer;
