import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  balancesUpdateNeeded: true,
};

export const userSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setBalancesUpdateNeeded(state, action) {
      state.balancesUpdateNeeded = action.payload;
    },
  },
});

export const {setBalancesUpdateNeeded} = userSlice.actions;

export default userSlice.reducer;
