import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  balancesUpdateNeeded: true,
  isMerchantChecked: false,
};

export const userSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setBalancesUpdateNeeded(state, action) {
      state.balancesUpdateNeeded = action.payload;
    },
    setMerchantChecked: (state, action) => {
      state.isMerchantChecked = action.payload;
    },
  },
});

export const {setBalancesUpdateNeeded, setMerchantChecked} = userSlice.actions;

export default userSlice.reducer;
