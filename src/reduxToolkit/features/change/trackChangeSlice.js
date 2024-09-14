import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  change: 'Unchanged',
};

export const trackChangeSlice = createSlice({
  name: 'Change',
  initialState,
  reducers: {
    setCHANGE: (state, action) => {
      state.change = action.payload;
    },
  },
});

export const {setCHANGE} = trackChangeSlice.actions;

export default trackChangeSlice.reducer;
