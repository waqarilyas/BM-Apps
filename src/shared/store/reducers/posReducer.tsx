import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [],
};

export const posSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    resetPos: state => initialState,
  },
});

export const {resetPos} = posSlice.actions;

export default posSlice.reducer;
