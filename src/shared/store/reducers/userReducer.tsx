import {createSlice} from '@reduxjs/toolkit';
import {UserState} from '../../models/types';

const initialState: UserState = {
  merchantEnabled: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMerchantEnabledState(state, action) {
      state.merchantEnabled = action.payload;
    },
  },
});

export const {setMerchantEnabledState} = userSlice.actions;

export default userSlice.reducer;
