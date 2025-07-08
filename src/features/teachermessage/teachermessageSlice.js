import { createSlice } from "@reduxjs/toolkit";
import {
    getAllteachermessage, getteachermessage, deleteteachermessage, addteachermessage

} from "./teachermessageThunk.js";

const initialState = {
    teachermessage: [],
    loading: false,
    error: null,
};

const handleFulfilled = (state, action) => {
    state.loading = false;
    state.teachermessage = action.payload;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error?.message || "Something went wrong";
};

const handlePending = (state) => {
    state.loading = true;
    state.error = null;
};

const teachermessageSlice = createSlice({
    name: "teachermessage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get single notice
        builder
            .addCase(getteachermessage.fulfilled, handleFulfilled)
            .addCase(getteachermessage.pending, handlePending)
            .addCase(getteachermessage.rejected, handleRejected)
            // update
            // .addCase(updateNotice.fulfilled, handleFulfilled)
            // .addCase(updateNotice.pending, handlePending)
            // .addCase(updateNotice.rejected, handleRejected)

            //get all messages
            .addCase(getAllteachermessage.fulfilled, handleFulfilled)
            .addCase(getAllteachermessage.pending, handlePending)
            .addCase(getAllteachermessage.rejected, handleRejected)

            //register message
            .addCase(addteachermessage.fulfilled, handleFulfilled)
            .addCase(addteachermessage.pending, handlePending)
            .addCase(addteachermessage.rejected, handleRejected)

            //delete message
            .addCase(deleteteachermessage.fulfilled, handleFulfilled)
            .addCase(deleteteachermessage.pending, handlePending)
            .addCase(deleteteachermessage.rejected, handleRejected);
    },
});

export default teachermessageSlice.reducer;