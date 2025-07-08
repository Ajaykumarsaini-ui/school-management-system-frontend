import { createSlice } from "@reduxjs/toolkit";
import {
  getteacherleave,
  updateteacherleave,
  registerteacherleave,
  deleteteacherleave,
  getteacherleaveById,
} from "./teacherleaveThunk";

const initialState = {
  teacherleave: [], // array, not null
  loading: false,
  error: null,
};

const teacherleaveSlice = createSlice({
  name: "teacherleave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all
    builder.addCase(getteacherleave.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getteacherleave.fulfilled, (state, action) => {
      state.loading = false;
      state.teacherleave = action.payload;
    });
    builder.addCase(getteacherleave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update (Approve/Reject)
    builder.addCase(updateteacherleave.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload;
      state.teacherleave = state.teacherleave.map((item) =>
        item._id === updated._id ? updated : item
      );
    });

    builder.addCase(updateteacherleave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateteacherleave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Register (Add)
    builder.addCase(registerteacherleave.fulfilled, (state, action) => {
      state.loading = false;
      state.teacherleave.push(action.payload);
    });
    builder.addCase(registerteacherleave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerteacherleave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteteacherleave.fulfilled, (state, action) => {
      state.loading = false;
      const deletedId = action.meta.arg;
      state.teacherleave = state.teacherleave.filter((item) => item._id !== deletedId);
    });
    builder.addCase(deleteteacherleave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteteacherleave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get By ID (Optional use)
    builder.addCase(getteacherleaveById.fulfilled, (state, action) => {
      state.loading = false;
      state.teacherleave = action.payload; // OR store as single object in another state field
    });
    builder.addCase(getteacherleaveById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getteacherleaveById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default teacherleaveSlice.reducer;
