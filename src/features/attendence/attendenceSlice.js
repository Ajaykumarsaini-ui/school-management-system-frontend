import { createSlice } from "@reduxjs/toolkit";
import {addAttendence , getAttendenceeverystudent , fetchAttendanceByDate , studentAttendencestatus , deleteAttendence } from "./attendenceThunk";

const initialState = {
    attendence: [],
    loading: false,
    error: null,
};

const handlepending = (state) => {
    state.loading = true;
    state.error = null;
};

const handleFulfilled = (state, action) => {
    state.loading = false;
    state.attendence = action.payload;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};


const attendenceSlice = createSlice({
    name: "attendence",
    initialState,
    extraReducers: (builder) => {
        // get attendence
        builder
        .addCase(getAttendenceeverystudent.pending, handlepending)
        .addCase(getAttendenceeverystudent.fulfilled, handleFulfilled)
        .addCase(getAttendenceeverystudent.rejected, handleRejected)

        // add attendence 
        .addCase(addAttendence.pending, handlepending)
        .addCase(addAttendence.fulfilled, handleFulfilled)
        .addCase(addAttendence.rejected, handleRejected)

        // fetch by date 
        .addCase(fetchAttendanceByDate.pending, handlepending)
        .addCase(fetchAttendanceByDate.fulfilled, handleFulfilled)
        .addCase(fetchAttendanceByDate.rejected, handleRejected)

        // student attendence status
        .addCase(studentAttendencestatus.pending, handlepending)
        .addCase(studentAttendencestatus.fulfilled, handleFulfilled)
        .addCase(studentAttendencestatus.rejected, handleRejected)

        // delete attendence
        .addCase(deleteAttendence.pending, handlepending)
        .addCase(deleteAttendence.fulfilled, handleFulfilled)
        .addCase(deleteAttendence.rejected, handleRejected)


    }
});
export default attendenceSlice.reducer;