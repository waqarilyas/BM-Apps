import {createSlice} from '@reduxjs/toolkit';
import {WalletState} from '../../models/types/index';

const initialState: WalletState = {
  wallet: [],
  mnemonic: {
    mnemonic_phrase: '',
    is_restore: false,
  },
  password_protection: {
    password: '',
    is_restore: false,
    status: false,
  },
  isRendered: false,
  walletReady: false,
  walletRendered: false,
  isProtected: false,
  walletDataLoaded: false,
  best24H: '',
  best24HBalance: '',
  worst24H: '',
  change24H: 0,
  defaultCurrency: 'USD',
  portfolioChartData: [],
  walletLoading: false,
  walletRefreshing: false,
  bep20_fee: '0.00',
  erc20_fee: '0.00',
  doge_fee: '0.00',
  btc_fee: '0.00',
  showBalances: true,
  walletAddress: '',
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
    setCoinBalanceAndRates(state, action) {
      state.wallet[action.payload.index].balance = action.payload.balance;
      state.wallet[action.payload.index].vs_currency_balance =
        action.payload.vs_currency_balance;
      state.wallet[action.payload.index].chart_data = action.payload.chart_data;
    },
    setWalletLoading(state, action) {
      state.walletLoading = action.payload;
    },
    setWalletRefreshing(state, action) {
      state.walletRefreshing = action.payload;
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
    setPassword(state, action) {
      state.password_protection.status = action.payload.status;
      state.password_protection.password = action.payload.password;
    },
    setBep20Fee(state, action) {
      state.bep20_fee = action.payload;
    },
    setERC20Fee(state, action) {
      state.erc20_fee = action.payload;
    },
    setBTCFee(state, action) {
      state.btc_fee = action.payload;
    },
    setDogeFee(state, action) {
      state.doge_fee = action.payload;
    },
    setShowBalances(state, action) {
      state.showBalances = action.payload;
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
  },
});

export const {
  setIsWalletRendered,
  setMnemonic,
  setWallet,
  setCoin,
  setCoinRate,
  setCoinBalance,
  setCoinBalanceAndRates,
  setWalletLoading,
  setWalletRefreshing,
  setWalletRestore,
  setCoinIsActive,
  resetWallet,
  setPassword,
  setBep20Fee,
  setERC20Fee,
  setBTCFee,
  setDogeFee,
  setShowBalances,
  setWalletAddress,
} = walletSlice.actions;

export default walletSlice.reducer;
