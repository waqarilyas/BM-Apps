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
  walletReady: false,
  walletRendered: false,
  isProtected: false,
  wallet_data_available: false,
  walletDataLoaded: false,
  best24H: '',
  best24HBalance: '',
  worst24H: '',
  change24H: 0,
  defaultCurrency: 'USD',
  portfolioChartData: [],
  walletLoading: true,
  walletAddress: '',
  showBalances: true,
};
export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    resetWallet: state => initialState,
    setDefaultCurrency(state, action) {
      state.defaultCurrency = action.payload;
    },
    setIsWalletRendered(state, action) {
      state.isRendered = action.payload;
    },
    setMnemonic(state, action) {
      state.mnemonic = action.payload;
    },
    setWallet(state, action) {
      state.wallet = action.payload;
    },
    setPortfolioAge(state, action) {
      state.portfolio_age = action.payload;
    },
    setCoin(state, action) {
      state.wallet[action.payload.index] = action.payload.coinData;
    },
    setCoinRate(state, action) {
      state.wallet[action.payload.index].chart_data = action.payload.chartData;
    },
    setCoinBalance(state, action) {
      state.wallet[action.payload.index].balance = action.payload.balance;
      state.wallet[action.payload.index].vs_currency_balance =
        action.payload.vs_currency_balance;
    },
    setWalletLoading(state, action) {
      state.walletLoading = action.payload;
    },
    setWalletRestore(state, action) {
      state.mnemonic.is_restore = action.payload;
    },
    setCoinIsActive(state, action) {
      state.wallet = state.wallet.map(c => {
        if (c.coin_symbol === action.payload) {
          c.is_active = !c.is_active;
        }
        return c;
      });
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setShowBalances: (state, action) => {
      state.showBalances = action.payload;
    },
  },
});

export const {
  setDefaultCurrency,
  setIsWalletRendered,
  setMnemonic,
  setWallet,
  setPortfolioAge,
  setCoin,
  setCoinRate,
  setCoinBalance,
  setWalletLoading,
  setWalletRestore,
  setCoinIsActive,
  resetWallet,
  setWalletAddress,
  setShowBalances,
} = walletSlice.actions;

export default walletSlice.reducer;
