import { createSlice } from "@reduxjs/toolkit";
import {
  loginteacher,
  getTeacher,
  registerTeacher,
  updateTeacher,
  deleteTeacher,
  getAllteachers,
  getAssignedclassesandstudents
} from "./teacherThunk";

const initialState = {
  teacher: [],
  classandstudent: [],
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.teacher = action.payload;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || action.error?.message || "Something went wrong";
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginteacher.pending, handlePending)
      .addCase(loginteacher.fulfilled, handleFulfilled)
      .addCase(loginteacher.rejected, handleRejected)

      .addCase(getTeacher.pending, handlePending)
      .addCase(getTeacher.fulfilled, handleFulfilled)
      .addCase(getTeacher.rejected, handleRejected)

      .addCase(registerTeacher.pending, handlePending)
      .addCase(registerTeacher.fulfilled, handleFulfilled)
      .addCase(registerTeacher.rejected, handleRejected)

      .addCase(updateTeacher.pending, handlePending)
      .addCase(updateTeacher.fulfilled, handleFulfilled)
      .addCase(updateTeacher.rejected, handleRejected)

      .addCase(deleteTeacher.pending, handlePending)
      .addCase(deleteTeacher.fulfilled, handleFulfilled)
      .addCase(deleteTeacher.rejected, handleRejected)

      .addCase(getAllteachers.pending, handlePending)
      .addCase(getAllteachers.fulfilled, handleFulfilled)
      .addCase(getAllteachers.rejected, handleRejected)

      .addCase(getAssignedclassesandstudents.pending, handlePending)
      .addCase(getAssignedclassesandstudents.fulfilled, (state, action) => {
        state.loading = false;
        state.classandstudent = action.payload;
        state.error = null;
      })
      .addCase(getAssignedclassesandstudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Something went wrong";
      });
  },
});

export default teacherSlice.reducer;
