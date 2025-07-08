import { createSlice } from "@reduxjs/toolkit";
import { registerSchedule ,getAllSchedule , deleteSchedule } from "./scheduleThunk";

const initialState = {
  schedule: null,
  loading: false,
  error: null,
  success: false,
};

const handlepanding = (state) => {
  state.loading = true;
  state.error = null;
  state.success = false;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.schedule = action.payload;
  state.success = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload || "Something went wrong";
  state.success = false;
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetScheduleState: (state) => {
      state.schedule = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSchedule.pending, handlepanding)
      .addCase(registerSchedule.fulfilled, handleFulfilled)
      .addCase(registerSchedule.rejected, handleRejected)

      .addCase(getAllSchedule.pending, handlepanding)
      .addCase(getAllSchedule.fulfilled, handleFulfilled)
      .addCase(getAllSchedule.rejected, handleRejected)

      .addCase(deleteSchedule.pending, handlepanding)
      .addCase(deleteSchedule.fulfilled, handleFulfilled)
      .addCase(deleteSchedule.rejected, handleRejected);
  },
});

export const { resetScheduleState } = scheduleSlice.actions;

export default scheduleSlice.reducer;
