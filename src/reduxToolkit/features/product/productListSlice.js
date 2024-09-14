import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const productListSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      setPRODUCT: (state, action) => {
        state.items = action.payload;
    },
    }
});


export const { setPRODUCT } = productListSlice.actions;

export default productListSlice.reducer;