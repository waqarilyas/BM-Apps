import {createSlice} from '@reduxjs/toolkit';

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    coins: [],
  },

  reducers: {},
});

export const {} = walletSlice.actions;

export default walletSlice.reducer;
