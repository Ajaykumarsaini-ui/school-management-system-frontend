import { createSlice } from "@reduxjs/toolkit";
import {
  getNotice,
  updateNotice,
  getAllnotices,
  registerNotice,
  deleteNotice,
} from "./noticeThunk";

const initialState = {
  notice: null,
  loading: false,
  error: null,
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.notice = action.payload;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error =
    action.payload || action.error?.message || "Something went wrong";
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get single notice
    builder
      .addCase(getNotice.fulfilled, handleFulfilled)
      .addCase(getNotice.pending, handlePending)
      .addCase(getNotice.rejected, handleRejected)
      // update
      .addCase(updateNotice.fulfilled, handleFulfilled)
      .addCase(updateNotice.pending, handlePending)
      .addCase(updateNotice.rejected, handleRejected)

      //get all notices
      .addCase(getAllnotices.fulfilled, handleFulfilled)
      .addCase(getAllnotices.pending, handlePending)
      .addCase(getAllnotices.rejected, handleRejected)

      //register notice
      .addCase(registerNotice.fulfilled, handleFulfilled)
      .addCase(registerNotice.pending, handlePending)
      .addCase(registerNotice.rejected, handleRejected)

      //delete notice
      .addCase(deleteNotice.fulfilled, handleFulfilled)
      .addCase(deleteNotice.pending, handlePending)
      .addCase(deleteNotice.rejected, handleRejected);
  },
});

export default noticeSlice.reducer;