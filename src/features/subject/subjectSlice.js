import { createSlice } from "@reduxjs/toolkit";
import { registerSubject, getAllsubjects, getSubject, updateSubject, deleteSubject } from "./subjectThunk";

const initialState = {
    subject: [],
    loading: false,
    error: null,
};

const handlepending = (state) => {
    state.loading = true;
    state.error = null;
};

const handleFulfilled = (state, action) => {
    state.loading = false;
    state.subject = action.payload;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error?.message || "Something went wrong";
};

const subjectSlice = createSlice({
    name: "subject",
    initialState,
    extraReducers: (builder) => {
        // registersubject
        builder
            .addCase(registerSubject.pending, handlepending)
            .addCase(registerSubject.fulfilled, handleFulfilled)
            .addCase(registerSubject.rejected, handleRejected)
            // get all subjects 
            .addCase(getAllsubjects.pending, handlepending)
            .addCase(getAllsubjects.fulfilled, handleFulfilled)
            .addCase(getAllsubjects.rejected, handleRejected)

            // update subject
            .addCase(updateSubject.pending, handlepending)
            .addCase(updateSubject.fulfilled, handleFulfilled)
            .addCase(updateSubject.rejected, handleRejected)

            // get single subject
            .addCase(getSubject.pending, handlepending)
            .addCase(getSubject.fulfilled, handleFulfilled)
            .addCase(getSubject.rejected, handleRejected)

            // delete subject
            .addCase(deleteSubject.fulfilled, handleFulfilled)
            .addCase(deleteSubject.pending, handlepending)
            .addCase(deleteSubject.rejected, handleRejected)
    },
});

export default subjectSlice.reducer;