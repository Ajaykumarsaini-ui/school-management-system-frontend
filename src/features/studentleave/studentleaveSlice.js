import { createSlice } from "@reduxjs/toolkit";
import {
  getstudentleave,
  updatestudentleave,
  registerstudentleave,
  deletestudentleave,
  getstudentleaveById,
} from "./studentleaveThunk";

const initialState = {
  studentleave: [], // array, not null
  loading: false,
  error: null,
};

const studentleaveSlice = createSlice({
  name: "studentleave",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all
    builder.addCase(getstudentleave.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getstudentleave.fulfilled, (state, action) => {
      state.loading = false;
      state.studentleave = action.payload;
    });
    builder.addCase(getstudentleave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update (Approve/Reject)
    builder.addCase(updatestudentleave.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload;
      state.studentleave = state.studentleave.map((item) =>
        item._id === updated._id ? updated : item
      );
    });

    builder.addCase(updatestudentleave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatestudentleave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Register (Add)
    builder.addCase(registerstudentleave.fulfilled, (state, action) => {
      state.loading = false;
      state.studentleave.push(action.payload);
    });
    builder.addCase(registerstudentleave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerstudentleave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deletestudentleave.fulfilled, (state, action) => {
      state.loading = false;
      const deletedId = action.meta.arg;
      state.studentleave = state.studentleave.filter((item) => item._id !== deletedId);
    });
    builder.addCase(deletestudentleave.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletestudentleave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get By ID (Optional use)
    builder.addCase(getstudentleaveById.fulfilled, (state, action) => {
      state.loading = false;
      state.studentleave = action.payload; // OR store as single object in another state field
    });
    builder.addCase(getstudentleaveById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getstudentleaveById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default studentleaveSlice.reducer;
