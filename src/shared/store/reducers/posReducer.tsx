import {createSlice} from '@reduxjs/toolkit';

export const posSlice = createSlice({
  name: 'pos',
  initialState: {
    products: [],
    cart: [],
  },

  reducers: {},
});

export const {} = posSlice.actions;

export default posSlice.reducer;
