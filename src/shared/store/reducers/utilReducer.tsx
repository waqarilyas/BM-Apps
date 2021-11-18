import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  balancesUpdateNeeded: true,
  isMerchantChecked: false,
  isNewWallet: false,
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

    setIsNewWallet: (state, action) => {
      state.isNewWallet = action.payload;
    },
  },
});

export const {setBalancesUpdateNeeded, setMerchantChecked, setIsNewWallet} =
  userSlice.actions;

export default userSlice.reducer;
