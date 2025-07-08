import { createSlice } from "@reduxjs/toolkit";
import {
    getAllstudentmessage, getstudentmessage, deletestudentmessage, addstudentmessage

} from "./studentmessageThunk.js";

const initialState = {
    studentmessage: null,
    loading: false,
    error: null,
};

const handleFulfilled = (state, action) => {
    state.loading = false;
    state.studentmessage = action.payload;
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

const studentmessageSlice = createSlice({
    name: "studentmessage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get single notice
        builder
            .addCase(getstudentmessage.fulfilled, handleFulfilled)
            .addCase(getstudentmessage.pending, handlePending)
            .addCase(getstudentmessage.rejected, handleRejected)
            // update
            // .addCase(updateNotice.fulfilled, handleFulfilled)
            // .addCase(updateNotice.pending, handlePending)
            // .addCase(updateNotice.rejected, handleRejected)

            //get all messages
            .addCase(getAllstudentmessage.fulfilled, handleFulfilled)
            .addCase(getAllstudentmessage.pending, handlePending)
            .addCase(getAllstudentmessage.rejected, handleRejected)

            //register message
            .addCase(addstudentmessage.fulfilled, handleFulfilled)
            .addCase(addstudentmessage.pending, handlePending)
            .addCase(addstudentmessage.rejected, handleRejected)

            //delete message
            .addCase(deletestudentmessage.fulfilled, handleFulfilled)
            .addCase(deletestudentmessage.pending, handlePending)
            .addCase(deletestudentmessage.rejected, handleRejected);
    },
});

export default studentmessageSlice.reducer;