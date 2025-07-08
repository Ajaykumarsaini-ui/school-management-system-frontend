import { createSlice } from "@reduxjs/toolkit";
import {
  loginstudent,
  getStudent,
  deleteStudent,
  updateStudent,
  registerStudent,
  getAllstudents,
  getSinglestudent ,
  studentSubjects
} from "./studentThunk";

const initialState = {
  student: null,               // for single student actions
  students: [],  
  studentSubject: [],              // for all students (list)
  totalPages: 1,
  page: 1,
  limit: 2,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const handleFulfilledStudent = (state, action) => {
  state.loading = false;
  state.student = action.payload;
  state.error = null;
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login Student
    builder
      .addCase(loginstudent.pending, handlePending)
      .addCase(loginstudent.fulfilled, handleFulfilledStudent)
      .addCase(loginstudent.rejected, handleRejected);

    // Get Single Student
    builder
      .addCase(getStudent.pending, handlePending)
      .addCase(getStudent.fulfilled, handleFulfilledStudent)
      .addCase(getStudent.rejected, handleRejected);

    // Update Student
    builder
      .addCase(updateStudent.pending, handlePending)
      .addCase(updateStudent.fulfilled, handleFulfilledStudent)
      .addCase(updateStudent.rejected, handleRejected);

    // Delete Student
    builder
      .addCase(deleteStudent.pending, handlePending)
      .addCase(deleteStudent.fulfilled, handleFulfilledStudent)
      .addCase(deleteStudent.rejected, handleRejected);

    // Register Student
    builder
      .addCase(registerStudent.pending, handlePending)
      .addCase(registerStudent.fulfilled, handleFulfilledStudent)
      .addCase(registerStudent.rejected, handleRejected);

    // Get Single Student
    builder
      .addCase(getSinglestudent.pending, handlePending)
      .addCase(getSinglestudent.fulfilled, handleFulfilledStudent)
      .addCase(getSinglestudent.rejected, handleRejected);

      // Get Student Subjects
      builder
      .addCase(studentSubjects.pending, handlePending)
      .addCase(studentSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.studentSubject = action.payload;
        state.error = null;
      })
      .addCase(studentSubjects.rejected, handleRejected);

    // Get All Students with Pagination
    builder
      .addCase(getAllstudents.pending, handlePending)
      .addCase(getAllstudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.docs;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.error = null;
      })
      .addCase(getAllstudents.rejected, handleRejected);
  },
});

export const { setPage } = studentSlice.actions;
export default studentSlice.reducer;
