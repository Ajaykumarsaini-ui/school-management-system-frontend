import { createSlice } from "@reduxjs/toolkit";
import {
    addClass,
    getAllclasses,
    updateClass,
    deleteClass,
} from "./classThunk";

const initialState = {
    classes: [],
    loading: false,
    error: null,
};

const handlepanding = (state) => {
    state.loading = true;
    state.error = null;
}

const handleFulfilled = (state, action) => {
    state.loading = false;
    state.classes = action.payload;
    state.error = null;
}

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error?.message || "Something went wrong";
}

const classSlice = createSlice({
    name: "classes",
    initialState,
    extraReducers: (builder) => {
        // getAllclasses
        builder.addCase(getAllclasses.pending, handlepanding)
        .addCase(getAllclasses.fulfilled, handleFulfilled)
        .addCase(getAllclasses.rejected, handleRejected)

        // addclasses
        .addCase(addClass.pending, handlepanding)
        .addCase(addClass.fulfilled, handleFulfilled)
        .addCase(addClass.rejected, handleRejected)

        // update class 
        .addCase(updateClass.pending, handlepanding)
        .addCase(updateClass.fulfilled, handleFulfilled)
        .addCase(updateClass.rejected, handleRejected)

        // delete class
        .addCase(deleteClass.pending, handlepanding)
        .addCase(deleteClass.fulfilled, handleFulfilled)
        .addCase(deleteClass.rejected, handleRejected)
    },
})

export default classSlice.reducer