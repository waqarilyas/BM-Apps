import {createSlice} from '@reduxjs/toolkit';
import {WalletState} from '../../models/types/index';

const initialState: WalletState = {
  wallet: [],
  portfolio_age: '',
  mnemonic: {
    mnemonic_phrase: '',
    is_restore: false,
  },
  password_protection: {
    password: '',
    is_restore: false,
  },
  isRendered: false,
  walletRendered: false,
  isProtected: false,
  wallet_data_available: false,
  walletDataLoaded: false,
  best24H: '',
  best24HBalance: '',
  worst24H: '',
  change24H: 0,
  defaultCurrency: '',
  portfolioChartData: [],
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    setDefaultCurrency(state, action) {
      state.defaultCurrency = action.payload;
    },
    setIsWalletRendered(state, action) {
      state.isRendered = action.payload;
    },
  },
});

export const {setDefaultCurrency, setIsWalletRendered} = walletSlice.actions;

export default walletSlice.reducer;
