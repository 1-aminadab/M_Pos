import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    draft: []
}

export const draftItemSlice = createSlice({
    name: 'draftItems',
    initialState,
    reducers: {
        setDRAFT: (state, action) => {
            state.draft = action.payload
        }
    }
});

export const { setDRAFT } = draftItemSlice.actions;

export default draftItemSlice.reducer;