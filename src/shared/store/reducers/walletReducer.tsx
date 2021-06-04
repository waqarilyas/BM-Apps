import {createSlice} from '@reduxjs/toolkit';

export const walletReducer = createSlice({
  name: 'wallet',
  initialState: {
    coins: [],
  },

  reducers: {},
});

export const {} = walletReducer.actions;

export default walletReducer.reducer;
