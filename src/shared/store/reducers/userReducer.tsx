import {createSlice} from '@reduxjs/toolkit';
import {UserState} from '../../models/types';

const initialState: UserState = {
  merchantEnabled: false,
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => initialState,
    setMerchantEnabledState(state, action) {
      state.merchantEnabled = action.payload;
    },
  },
});

export const {setMerchantEnabledState, resetUser} = userSlice.actions;

export default userSlice.reducer;
