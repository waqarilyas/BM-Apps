import {createSlice} from '@reduxjs/toolkit';
import {UserState} from '../../models/types';

const initialState: UserState = {
  merchantEnabled: false,
  merchantData: null,
  token: '',
  merchantShop: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => initialState,
    setMerchantEnabledState(state, action) {
      state.merchantEnabled = action.payload;
    },
    setMerchantData: (state, action) => {
      state.merchantData = action.payload;
    },
    setMerchantShop: (state, action) => {
      state.merchantShop = action.payload;
    },
  },
});

export const {
  setMerchantEnabledState,
  resetUser,
  setMerchantData,
  setMerchantShop,
} = userSlice.actions;

export default userSlice.reducer;
