import {createSlice} from '@reduxjs/toolkit';

export const posReducer = createSlice({
  name: 'pos',
  initialState: {
    products: [],
    cart: [],
  },

  reducers: {},
});

export const {} = posReducer.actions;

export default posReducer.reducer;
